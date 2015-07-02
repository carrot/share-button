Feature: Reddit Network

  Background:
    Given I create a Reddit Share Button

  @reddit
  Scenario: Display Reddit Network
    When I click the Reddit Share Button
    Then I should see the Reddit button
    When I click the Reddit button
    Then I should have a correct Reddit share url
