Feature: Facebook Network

  Background:
    Given I create a Facebook Share Button

  @facebook
  Scenario: Display Facebook Network
    When I click the Facebook Share Button
    Then I should see the Facebook button
    When I click the Facebook button
    Then I should have a correct Facebook share url
