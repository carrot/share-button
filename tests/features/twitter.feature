Feature: Twitter Network

  Background:
    Given I create a Twitter Share Button

  @twitter
  Scenario: Twitter network should be displayed and have the correct URL
    When I click the Twitter Share Button
    Then I should see the Twitter button
    When I click the Twitter button
    Then I should have a correct Twitter share url
