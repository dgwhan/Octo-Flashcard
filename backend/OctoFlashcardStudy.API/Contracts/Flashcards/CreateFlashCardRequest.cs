namespace OctoFlashcardStudy.API.Contracts.FlashCards
{
    public class CreateFlashCardRequest
    {
        public string Term { get; set; } = string.Empty;
        public string TermLanguage { get; set; } = string.Empty;

        public string Definition { get; set; } = string.Empty;
        public string DefinitionLanguage { get; set; } = string.Empty;
    }
}