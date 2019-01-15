package com.lena.ms.gateway.cucumber.stepdefs;

import com.lena.ms.gateway.LenaGatewayApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = LenaGatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
