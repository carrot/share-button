Feature: Google Plus Network

  Background:
    Given I create a Google Plus Share Button

  @googleplus
  Scenario: Google Plus network should be displayed and have the correct URL
    When I click the Google Plus Share Button
    Then I should see the Google Plus button
    When I click the Google Plus button
    Then I should have a correct Google Plus share url
