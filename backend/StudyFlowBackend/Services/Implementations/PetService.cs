using System;
using System.Threading.Tasks;
using StudyFlowBackend.Constants;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class PetService : IPetService
    {
        private readonly IPetRepository _petRepository;
        private readonly IUserRepository _userRepository;
        private readonly INotificationService _notificationService;

        public PetService(
            IPetRepository petRepository,
            IUserRepository userRepository,
            INotificationService notificationService)
        {
            _petRepository = petRepository;
            _userRepository = userRepository;
            _notificationService = notificationService;
        }

        private static double GetPetRequiredXp(int level)
        {
            return Math.Round(GamificationConstants.PetLevelUpBaseXp * Math.Pow(level, GamificationConstants.PetLevelUpExponent));
        }

        public async Task<StudyPet?> GetPetAsync(string userId)
        {
            var pet = await _petRepository.GetPetByUserIdAsync(userId);
            if (pet == null) return null;

            var timeSpanSinceLastFed = DateTime.UtcNow - pet.LastFedTime;
            var hoursPassed = timeSpanSinceLastFed.TotalHours;

            if (hoursPassed >= 1)
            {
                int hungerLost = (int)(hoursPassed * GamificationConstants.PetHungerDecayRatePerHour);
                int oldHunger = pet.Hunger;
                pet.Hunger = Math.Max(0, pet.Hunger - hungerLost);

                if (pet.Hunger > 0 || oldHunger > 0)
                {
                    _petRepository.Update(pet);
                    await _petRepository.SaveChangesAsync();
                }
            }

            return pet;
        }

        public async Task<StudyPet> AdoptPetAsync(string userId, string name, string petType)
        {
            var existingPet = await _petRepository.GetPetByUserIdAsync(userId);
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

            await _petRepository.AddAsync(pet);
            await _petRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                userId,
                "🥚 Successfully Adopted a Pet!",
                $"Welcome '{name}' ({petType}) to your study journey! Accumulate Coins to feed the egg and hatch it into a cute pet!",
                "Pet"
            );

            return pet;
        }

        public async Task<StudyPet> FeedPetAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new InvalidOperationException("User not found.");

            var pet = await _petRepository.GetPetByUserIdAsync(userId);
            if (pet == null) throw new InvalidOperationException("You haven't adopted a pet yet.");

            if (user.Coins < GamificationConstants.PetFeedCost)
            {
                throw new InvalidOperationException($"You don't have enough Coins! Feeding the pet costs {GamificationConstants.PetFeedCost} Coins.");
            }

            user.Coins -= GamificationConstants.PetFeedCost;
            pet.Hunger = Math.Min(GamificationConstants.PetMaxHunger, pet.Hunger + GamificationConstants.PetFeedHungerRecovery);
            pet.Exp += GamificationConstants.PetFeedExpGain;
            pet.LastFedTime = DateTime.UtcNow;

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

            _userRepository.Update(user);
            _petRepository.Update(pet);
            await _petRepository.SaveChangesAsync();

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

            return pet;
        }

        public async Task<StudyPet> InteractWithPetAsync(string userId)
        {
            var pet = await _petRepository.GetPetByUserIdAsync(userId);
            if (pet == null) throw new InvalidOperationException("You haven't adopted a pet yet.");

            if (pet.Hunger < 5)
            {
                throw new InvalidOperationException("Pet is too hungry to play! Feed it first.");
            }

            pet.Hunger -= 5;
            pet.Exp += GamificationConstants.PetPlayExpGain;

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

            _petRepository.Update(pet);
            await _petRepository.SaveChangesAsync();

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

            return pet;
        }
    }
}
