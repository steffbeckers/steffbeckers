FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dependencies
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet tool install -g dotnet-subset --version 0.3.2 \
 && dotnet tool install -g Volo.Abp.Cli --version 8.1.3 \
 && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
 && apt-get install nodejs -y \
 && npm install -g yarn;

FROM dependencies AS prepare-restore
WORKDIR /src
COPY . .
RUN dotnet subset restore src/SteffBeckers.HttpApi.Host/SteffBeckers.HttpApi.Host.csproj --root-directory /src --output restore-subset/

FROM dependencies AS prepare-libs
WORKDIR /src/src/SteffBeckers.HttpApi.Host/
COPY src/SteffBeckers.HttpApi.Host/SteffBeckers.HttpApi.Host.csproj SteffBeckers.HttpApi.Host.csproj
COPY src/SteffBeckers.HttpApi.Host/package.json package.json
COPY src/SteffBeckers.HttpApi.Host/yarn.lock yarn.lock
RUN abp install-libs

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS restore
WORKDIR /src
COPY --from=prepare-restore /src/restore-subset .
RUN dotnet restore src/SteffBeckers.HttpApi.Host/SteffBeckers.HttpApi.Host.csproj

FROM restore AS build
WORKDIR /src
COPY --from=prepare-libs /src/src/SteffBeckers.HttpApi.Host/wwwroot/libs src/SteffBeckers.HttpApi.Host/wwwroot/libs
COPY . .
RUN dotnet build src/SteffBeckers.HttpApi.Host/SteffBeckers.HttpApi.Host.csproj -c Release --no-restore

FROM build AS publish
WORKDIR /src
RUN dotnet publish src/SteffBeckers.HttpApi.Host/SteffBeckers.HttpApi.Host.csproj -c Release --no-build -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SteffBeckers.HttpApi.Host.dll"]
