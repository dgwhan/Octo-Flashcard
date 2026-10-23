using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services;
using StudyFlowBackend.Utils;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace StudyFlowBackend.Controllers
{
    /// <summary>
    /// API Controller for handling Study Task management (CRUD operations).
    /// Requires Firebase authentication.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IUserUtils _userUtils;

        public TasksController(ITaskService taskService, IUserUtils userUtils)
        {
            _taskService = taskService;
            _userUtils = userUtils;
        }

        /// <summary>
        /// Retrieves all tasks created by the currently authenticated user.
        /// </summary>
        /// <returns>A list of TaskDto objects.</returns>
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) 
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var tasks = await _taskService.GetTasksByUserIdAsync(userId);
            return Ok(ApiResponse<IEnumerable<TaskDto>>.SuccessResponse(tasks));
        }

        /// <summary>
        /// Retrieves a specific task by its ID, ensuring it belongs to the authenticated user.
        /// </summary>
        /// <param name="id">The Guid identifier of the task.</param>
        /// <returns>A TaskDto object if found, or NotFound status.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) 
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var task = await _taskService.GetTaskByIdAsync(id, userId);
            
            if (task == null) 
                return NotFound(ApiResponse<object>.ErrorResponse("Task not found"));
                
            return Ok(ApiResponse<TaskDto>.SuccessResponse(task));
        }

        /// <summary>
        /// Creates a new study task for the authenticated user.
        /// </summary>
        /// <param name="dto">The data transfer object containing task details.</param>
        /// <returns>The created TaskDto.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) 
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var createdTask = await _taskService.CreateTaskAsync(userId, dto);
            
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, 
                ApiResponse<TaskDto>.SuccessResponse(createdTask, "Task created successfully"));
        }

        /// <summary>
        /// Updates an existing task with new values.
        /// </summary>
        /// <param name="id">The Guid identifier of the task to update.</param>
        /// <param name="dto">The data containing updated properties.</param>
        /// <returns>The updated TaskDto.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) 
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var updatedTask = await _taskService.UpdateTaskAsync(id, userId, dto);
            
            if (updatedTask == null) 
                return NotFound(ApiResponse<object>.ErrorResponse("Task not found"));
                
            return Ok(ApiResponse<TaskDto>.SuccessResponse(updatedTask, "Task updated successfully"));
        }

        /// <summary>
        /// Deletes a task by ID. Note that completed tasks are blocked from deletion to preserve stats.
        /// </summary>
        /// <param name="id">The Guid identifier of the task to delete.</param>
        /// <returns>A status response signifying success or failure.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) 
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var task = await _taskService.GetTaskByIdAsync(id, userId);
            if (task == null) 
                return NotFound(ApiResponse<object>.ErrorResponse("Task not found"));

            // Prevent deletion of already completed tasks to avoid database state sync conflicts
            if (task.IsCompleted)
                return BadRequest(ApiResponse<object>.ErrorResponse("Completed tasks cannot be deleted."));

            var result = await _taskService.DeleteTaskAsync(id, userId);
            
            if (!result) 
                return NotFound(ApiResponse<object>.ErrorResponse("Task not found"));
                
            return Ok(ApiResponse<object>.SuccessResponse(null, "Task deleted successfully"));
        }
    }
}
