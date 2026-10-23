using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Constants;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Triển khai dịch vụ quản lý Study Pet (thú cưng học tập).
    /// </summary>
    public class PetService : IPetService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notificationService;

        public PetService(AppDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        /// <summary>
        /// Điểm EXP yêu cầu của thú cưng để thăng cấp: Required Pet XP = Base * L^Exponent
        /// </summary>
        private static double GetPetRequiredXp(int level)
        {
            return Math.Round(GamificationConstants.PetLevelUpBaseXp * Math.Pow(level, GamificationConstants.PetLevelUpExponent));
        }

        /// <summary>
        /// Lấy thông tin Pet hiện tại của người dùng và tự động cập nhật mức Hunger giảm dần theo thời gian.
        /// </summary>
        public async Task<StudyPet?> GetPetAsync(string userId)
        {
            var pet = await _context.StudyPets
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (pet == null) return null;

            // Tính toán độ đói giảm dần (lấy tỷ lệ giảm từ Constants)
            var timeSpanSinceLastFed = DateTime.UtcNow - pet.LastFedTime;
            var hoursPassed = timeSpanSinceLastFed.TotalHours;

            if (hoursPassed >= 1)
            {
                int hungerLost = (int)(hoursPassed * GamificationConstants.PetHungerDecayRatePerHour);
                int oldHunger = pet.Hunger;
                pet.Hunger = Math.Max(0, pet.Hunger - hungerLost);
                
                if (pet.Hunger > 0 || oldHunger > 0)
                {
                    await _context.SaveChangesAsync();
                }
            }

            return pet;
        }

        /// <summary>
        /// Nhận nuôi Pet mới.
        /// </summary>
        public async Task<StudyPet> AdoptPetAsync(string userId, string name, string petType)
        {
            var existingPet = await _context.StudyPets.FirstOrDefaultAsync(p => p.UserId == userId);
            if (existingPet != null)
            {
                throw new InvalidOperationException("You've adopted a pet!");
            }

            var pet = new StudyPet
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = name,
                PetType = petType,
                Level = 1,
                Exp = 0,
                EvolutionStage = "Egg",
                Hunger = 80,
                LastFedTime = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            _context.StudyPets.Add(pet);
            await _context.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                userId,
                "🥚 Successfully Adopted a Pet!",
                $"Welcome '{name}' ({petType}) to your study journey! Accumulate Coins to feed the egg and hatch it into a cute pet!",
                "Pet"
            );

            return pet;
        }

        /// <summary>
        /// Cho thú cưng ăn bánh quy. Tiêu tốn xu, tăng Hunger và EXP của Pet (lấy thông số từ Constants).
        /// </summary>
        public async Task<StudyPet> FeedPetAsync(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) throw new InvalidOperationException("User not found.");

            var pet = await _context.StudyPets.FirstOrDefaultAsync(p => p.UserId == userId);
            if (pet == null) throw new InvalidOperationException("You haven't adopted a pet yet.");

            // Kiểm tra số dư Coins
            if (user.Coins < GamificationConstants.PetFeedCost)
            {
                throw new InvalidOperationException($"You don't have enough Coins! Feeding the pet costs {GamificationConstants.PetFeedCost} Coins.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Trừ Coins của user
                user.Coins -= GamificationConstants.PetFeedCost;

                // Cộng Hunger no bụng
                pet.Hunger = Math.Min(GamificationConstants.PetMaxHunger, pet.Hunger + GamificationConstants.PetFeedHungerRecovery);

                // Cộng EXP cho Pet
                pet.Exp += GamificationConstants.PetFeedExpGain;
                pet.LastFedTime = DateTime.UtcNow;

                // Kiểm tra thăng cấp cho Pet
                bool petLeveledUp = false;
                string oldStage = pet.EvolutionStage;
                double requiredExp = GetPetRequiredXp(pet.Level);

                while (pet.Exp >= requiredExp)
                {
                    pet.Exp -= requiredExp;
                    pet.Level++;
                    petLeveledUp = true;
                    requiredExp = GetPetRequiredXp(pet.Level);
                }

                // Xử lý tiến hóa dựa trên cấp độ Pet
                if (pet.Level >= 10) pet.EvolutionStage = "Adult";
                else if (pet.Level >= 6) pet.EvolutionStage = "Teen";
                else if (pet.Level >= 3) pet.EvolutionStage = "Baby";
                else pet.EvolutionStage = "Egg";

                await _context.SaveChangesAsync();

                // Phát thông báo
                if (petLeveledUp)
                {
                    await _notificationService.CreateNotificationAsync(
                        userId,
                        $"✨ Pet '{pet.Name}' leveled up!",
                        $"Congratulations! Your pet '{pet.Name}' has reached Level {pet.Level}!",
                        "Pet"
                    );

                    if (pet.EvolutionStage != oldStage)
                    {
                        await _notificationService.CreateNotificationAsync(
                            userId,
                            $"🌟 Your pet has evolved!",
                            $"Your pet '{pet.Name}' has evolved from the '{oldStage}' stage to the '{pet.EvolutionStage}' stage!",
                            "Pet"
                        );
                    }
                }

                await transaction.CommitAsync();
                return pet;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        /// <summary>
        /// Tương tác/Vui chơi cùng Pet để tăng EXP cho Pet (lấy thông số từ Constants).
        /// </summary>
        public async Task<StudyPet> InteractWithPetAsync(string userId)
        {
            var pet = await _context.StudyPets.FirstOrDefaultAsync(p => p.UserId == userId);
            if (pet == null) throw new InvalidOperationException("You haven't adopted a pet yet.");

            if (pet.Hunger < 5)
            {
                throw new InvalidOperationException("Pet is too hungry to play! Feed it first.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Giảm hunger
                pet.Hunger -= 5;

                // Tương tác cộng EXP cho Pet
                pet.Exp += GamificationConstants.PetPlayExpGain;

                // Kiểm tra thăng cấp
                bool petLeveledUp = false;
                string oldStage = pet.EvolutionStage;
                double requiredExp = GetPetRequiredXp(pet.Level);

                while (pet.Exp >= requiredExp)
                {
                    pet.Exp -= requiredExp;
                    pet.Level++;
                    petLeveledUp = true;
                    requiredExp = GetPetRequiredXp(pet.Level);
                }

                if (pet.Level >= 10) pet.EvolutionStage = "Adult";
                else if (pet.Level >= 6) pet.EvolutionStage = "Teen";
                else if (pet.Level >= 3) pet.EvolutionStage = "Baby";
                else pet.EvolutionStage = "Egg";

                await _context.SaveChangesAsync();

                if (petLeveledUp)
                {
                    await _notificationService.CreateNotificationAsync(
                        userId,
                        $"✨ Pet '{pet.Name}' leveled up!",
                        $"Congratulations! Your pet '{pet.Name}' has reached Level {pet.Level}!",
                        "Pet"
                    );

                    if (pet.EvolutionStage != oldStage)
                    {
                        await _notificationService.CreateNotificationAsync(
                            userId,
                            $"🌟 Your pet has evolved!",
                            $"Your pet '{pet.Name}' has evolved from the '{oldStage}' stage to the '{pet.EvolutionStage}' stage!",
                            "Pet"
                        );
                    }
                }

                await transaction.CommitAsync();
                return pet;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
