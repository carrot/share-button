Feature: Twitter Network

  Background:
    Given I create a Twitter Share Button

  @twitter
  Scenario: Display Twitter Network
    When I click the Twitter Share Button
    Then I should see the Twitter button
    When I click the Twitter button
    Then I should have a correct Twitter share url
