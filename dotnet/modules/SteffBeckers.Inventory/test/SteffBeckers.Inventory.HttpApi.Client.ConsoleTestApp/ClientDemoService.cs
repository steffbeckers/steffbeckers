﻿using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;

//using SteffBeckers.Inventory.Samples;
using Volo.Abp.DependencyInjection;
using Volo.Abp.IdentityModel;

namespace SteffBeckers.Inventory;

public class ClientDemoService : ITransientDependency
{
    //private readonly ISampleAppService _sampleAppService;
    private readonly IIdentityModelAuthenticationService _authenticationService;

    private readonly IConfiguration _configuration;

    public ClientDemoService(
        //ISampleAppService sampleAppService,
        IIdentityModelAuthenticationService authenticationService,
        IConfiguration configuration)
    {
        //_sampleAppService = sampleAppService;
        _authenticationService = authenticationService;
        _configuration = configuration;
    }

    public async Task RunAsync()
    {
        await TestWithDynamicProxiesAsync();
        await TestWithHttpClientAndIdentityModelAuthenticationServiceAsync();
        await TestAllManuallyAsync();
    }

    /* Shows how to perform an HTTP request to the API using ABP's dynamic c# proxy
     * feature. It is just simple as calling a local service method.
     * Authorization and HTTP request details are handled by the ABP framework.
     */

    private async Task TestWithDynamicProxiesAsync()
    {
        Console.WriteLine();
        Console.WriteLine($"***** {nameof(TestWithDynamicProxiesAsync)} *****");

        //var result = await _sampleAppService.GetAsync();
        //Console.WriteLine("Result: " + result.Value);

        //result = await _sampleAppService.GetAuthorizedAsync();
        //Console.WriteLine("Result (authorized): " + result.Value);
    }

    /* Shows how to use HttpClient to perform a request to the HTTP API.
     * It uses ABP's IIdentityModelAuthenticationService to simplify obtaining access tokens.
     */

    private async Task TestWithHttpClientAndIdentityModelAuthenticationServiceAsync()
    {
        Console.WriteLine();
        Console.WriteLine($"***** {nameof(TestWithHttpClientAndIdentityModelAuthenticationServiceAsync)} *****");

        //Get access token using ABP's IIdentityModelAuthenticationService

        string accessToken = await _authenticationService.GetAccessTokenAsync(
            new IdentityClientConfiguration(
                _configuration["IdentityClients:Default:Authority"],
                _configuration["IdentityClients:Default:Scope"],
                _configuration["IdentityClients:Default:ClientId"],
                _configuration["IdentityClients:Default:ClientSecret"],
                _configuration["IdentityClients:Default:GrantType"],
                _configuration["IdentityClients:Default:UserName"],
                _configuration["IdentityClients:Default:UserPassword"]
            )
        );

        //Perform the actual HTTP request

        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.SetBearerToken(accessToken);

            string url = _configuration["RemoteServices:Inventory:BaseUrl"] +
                      "api/Inventory/sample/authorized";

            HttpResponseMessage responseMessage = await httpClient.GetAsync(url);
            if (responseMessage.IsSuccessStatusCode)
            {
                string responseString = await responseMessage.Content.ReadAsStringAsync();
                Console.WriteLine("Result: " + responseString);
            }
            else
            {
                throw new Exception("Remote server returns error code: " + responseMessage.StatusCode);
            }
        }
    }

    /* Shows how to use HttpClient to perform a request to the HTTP API.
     */

    private async Task TestAllManuallyAsync()
    {
        Console.WriteLine();
        Console.WriteLine($"***** {nameof(TestAllManuallyAsync)} *****");

        //Obtain access token from the IDS4 server

        // discover endpoints from metadata
        HttpClient client = new HttpClient();
        DiscoveryDocumentResponse disco = await client.GetDiscoveryDocumentAsync(_configuration["IdentityClients:Default:Authority"]);
        if (disco.IsError)
        {
            Console.WriteLine(disco.Error);
            return;
        }

        // request token
        TokenResponse tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = _configuration["IdentityClients:Default:ClientId"],
            ClientSecret = _configuration["IdentityClients:Default:ClientSecret"],
            UserName = _configuration["IdentityClients:Default:UserName"],
            Password = _configuration["IdentityClients:Default:UserPassword"],
            Scope = _configuration["IdentityClients:Default:Scope"]
        });

        if (tokenResponse.IsError)
        {
            Console.WriteLine(tokenResponse.Error);
            return;
        }

        Console.WriteLine(tokenResponse.Json);

        //Perform the actual HTTP request

        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.SetBearerToken(tokenResponse.AccessToken);

            string url = _configuration["RemoteServices:Inventory:BaseUrl"] +
                      "api/Inventory/sample/authorized";

            HttpResponseMessage responseMessage = await httpClient.GetAsync(url);
            if (responseMessage.IsSuccessStatusCode)
            {
                string responseString = await responseMessage.Content.ReadAsStringAsync();
                Console.WriteLine("Result: " + responseString);
            }
            else
            {
                throw new Exception("Remote server returns error code: " + responseMessage.StatusCode);
            }
        }
    }
}