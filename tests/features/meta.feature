Feature: Meta Tag Networks

  Background:
    Given I create and click a meta tag Share Button

  @meta
  Scenario: Get Network URLs
    When I click all the network buttons
    Then All buttons should have valid URLs
