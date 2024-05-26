FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dependencies
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet tool install -g dotnet-subset --version 0.3.2

FROM dependencies AS prepare-restore
WORKDIR /src
COPY . .
RUN dotnet subset restore src/SteffBeckers.DbMigrator/SteffBeckers.DbMigrator.csproj --root-directory /src --output restore-subset/

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS restore
WORKDIR /src
COPY --from=prepare-restore /src/restore-subset .
RUN dotnet restore src/SteffBeckers.DbMigrator/SteffBeckers.DbMigrator.csproj

FROM restore AS build
WORKDIR /src
COPY . .
RUN dotnet build src/SteffBeckers.DbMigrator/SteffBeckers.DbMigrator.csproj -c Release --no-restore

FROM build AS publish
WORKDIR /src
RUN dotnet publish src/SteffBeckers.DbMigrator/SteffBeckers.DbMigrator.csproj -c Release --no-build -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SteffBeckers.DbMigrator.dll"]
