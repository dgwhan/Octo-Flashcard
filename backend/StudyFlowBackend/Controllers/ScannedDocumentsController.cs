using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services;
using StudyFlowBackend.Utils;
using StudyFlowBackend.Data;

namespace StudyFlowBackend.Controllers
{
    /// <summary>
    /// API Controller quản lý tài liệu OCR đã quét (Scanned Documents).
    /// Hỗ trợ CRUD, tìm kiếm và kiểm tra storage usage.
    /// Requires Firebase authentication.
    /// </summary>
    [ApiController]
    [Route("api/scanned-documents")]
    [Authorize]
    public class ScannedDocumentsController : ControllerBase
    {
        private readonly IScannedDocumentService _scannedDocumentService;
        private readonly IStorageQuotaService _storageQuotaService;
        private readonly IUserUtils _userUtils;

        public ScannedDocumentsController(
            IScannedDocumentService scannedDocumentService,
            IStorageQuotaService storageQuotaService,
            IUserUtils userUtils)
        {
            _scannedDocumentService = scannedDocumentService;
            _storageQuotaService = storageQuotaService;
            _userUtils = userUtils;
        }

        /// <summary>
        /// Tạo mới tài liệu OCR. Kiểm tra storage quota trước khi lưu.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateScannedDocumentDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var result = await _scannedDocumentService.CreateAsync(userId, dto);
                return CreatedAtAction(nameof(GetById), new { id = result.Id },
                    ApiResponse<ScannedDocumentResponseDto>.SuccessResponse(result, "Document OCR creation was successful."));
            }
            catch (InvalidOperationException ex)
            {
                // Quota exceeded hoặc lỗi business logic
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        /// <summary>
        /// Lấy tất cả tài liệu OCR của user hiện tại. Hỗ trợ pagination với page và pageSize.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var allDocuments = await _scannedDocumentService.GetAllAsync(userId);

            // Áp dụng pagination phía server
            var totalCount = allDocuments.Count;
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginatedDocuments = allDocuments
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Items = paginatedDocuments,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };

            return Ok(ApiResponse<object>.SuccessResponse(response));
        }

        /// <summary>
        /// Lấy chi tiết 1 tài liệu OCR theo ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var document = await _scannedDocumentService.GetByIdAsync(userId, id);

            if (document == null)
                return NotFound(ApiResponse<object>.ErrorResponse("Document not found"));

            return Ok(ApiResponse<ScannedDocumentResponseDto>.SuccessResponse(document));
        }

        /// <summary>
        /// Lấy file ảnh của tài liệu OCR.
        /// </summary>
        [HttpGet("{id}/image")]
        [AllowAnonymous]
        public async Task<IActionResult> GetImage(Guid id)
        {
            // Note: In production, you might want to authenticate this endpoint.
            // Using AllowAnonymous to simplify Flutter integration without needing custom headers for CachedNetworkImage.
            var dbContext = HttpContext.RequestServices.GetService(typeof(AppDbContext)) as AppDbContext;
            if (dbContext == null) return StatusCode(500);

            var document = await dbContext.ScannedDocuments.FindAsync(id);
            if (document == null || document.ImageData == null || document.ImageData.Length == 0)
            {
                return NotFound("Image not found");
            }

            return File(document.ImageData, "image/jpeg");
        }

        /// <summary>
        /// Cập nhật tài liệu OCR (Title, ExtractedText).
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateScannedDocumentDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var result = await _scannedDocumentService.UpdateAsync(userId, id, dto);

            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Document not found"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Document updated successfully"));
        }

        /// <summary>
        /// Xóa mềm tài liệu OCR.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var result = await _scannedDocumentService.DeleteAsync(userId, id);

            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Document not found"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Document moved to trash"));
        }

        /// <summary>
        /// Lấy tất cả tài liệu OCR trong thùng rác.
        /// </summary>
        [HttpGet("trash")]
        public async Task<IActionResult> GetTrash()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var trashDocuments = await _scannedDocumentService.GetTrashAsync(userId);
            return Ok(ApiResponse<List<ScannedDocumentResponseDto>>.SuccessResponse(trashDocuments));
        }

        /// <summary>
        /// Phục hồi tài liệu OCR từ thùng rác.
        /// </summary>
        [HttpPost("restore/{id}")]
        public async Task<IActionResult> Restore(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var result = await _scannedDocumentService.RestoreAsync(userId, id);
            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Document not found in trash"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Document restored successfully"));
        }

        /// <summary>
        /// Xóa vĩnh viễn tài liệu OCR. Storage usage sẽ được cập nhật tự động.
        /// Client cần tự xóa file trên Firebase Storage bằng StoragePath trả về trước đó.
        /// </summary>
        [HttpDelete("hard-delete/{id}")]
        public async Task<IActionResult> HardDelete(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var result = await _scannedDocumentService.HardDeleteAsync(userId, id);
            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Document not found in trash"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Document permanently deleted"));
        }

        /// <summary>
        /// Xóa mềm nhiều tài liệu OCR.
        /// </summary>
        [HttpPost("batch-delete")]
        public async Task<IActionResult> BatchDelete([FromBody] List<Guid> ids)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (ids == null || !ids.Any())
                return BadRequest(ApiResponse<object>.ErrorResponse("List of IDs cannot be empty"));

            var result = await _scannedDocumentService.BatchDeleteAsync(userId, ids);
            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Documents not found"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Documents moved to trash"));
        }

        /// <summary>
        /// Lấy thông tin storage usage hiện tại của user (đã dùng, quota, phần trăm, số document).
        /// </summary>
        [HttpGet("storage-usage")]
        public async Task<IActionResult> GetStorageUsage()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var usage = await _storageQuotaService.GetUsageAsync(userId);
            return Ok(ApiResponse<StorageUsageResponseDto>.SuccessResponse(usage));
        }

        /// <summary>
        /// Tìm kiếm tài liệu OCR theo keyword (tìm trên Title và ExtractedText, case-insensitive).
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q = "")
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (string.IsNullOrWhiteSpace(q))
                return BadRequest(ApiResponse<object>.ErrorResponse("Search query cannot be empty"));

            var results = await _scannedDocumentService.SearchAsync(userId, q);
            return Ok(ApiResponse<List<ScannedDocumentResponseDto>>.SuccessResponse(results));
        }
    }
}
