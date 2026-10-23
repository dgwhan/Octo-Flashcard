FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY StudyFlowBackend/StudyFlowBackend/StudyFlowBackend.csproj StudyFlowBackend/StudyFlowBackend/
RUN dotnet restore StudyFlowBackend/StudyFlowBackend/StudyFlowBackend.csproj

COPY . .

WORKDIR /src/StudyFlowBackend/StudyFlowBackend

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "StudyFlowBackend.dll"]