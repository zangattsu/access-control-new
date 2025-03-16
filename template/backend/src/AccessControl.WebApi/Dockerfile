#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/AccessControl.WebApi/AccessControl.WebApi.csproj", "src/AccessControl.WebApi/"]
COPY ["src/AccessControl.IoC/AccessControl.IoC.csproj", "src/AccessControl.IoC/"]
COPY ["src/AccessControl.Domain/AccessControl.Domain.csproj", "src/AccessControl.Domain/"]
COPY ["src/AccessControl.Common/AccessControl.Common.csproj", "src/AccessControl.Common/"]
COPY ["src/AccessControl.Application/AccessControl.Application.csproj", "src/AccessControl.Application/"]
COPY ["src/AccessControl.ORM/AccessControl.ORM.csproj", "src/AccessControl.ORM/"]
RUN dotnet restore "./src/AccessControl.WebApi/AccessControl.WebApi.csproj"
COPY . .
WORKDIR "/src/src/AccessControl.WebApi"
RUN dotnet build "./AccessControl.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AccessControl.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AccessControl.WebApi.dll"]