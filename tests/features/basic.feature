Feature: Basic Button

  Background:
    Given I create a basic Share Button

  @basic
  Scenario: All social networks should be displayed
    When I click the Share Button
    Then I should see all Social Networks
