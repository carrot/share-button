Feature: Email Network

  Background:
    Given I create an Email Share Button

  @email
  Scenario: Display Email Network
    When I click the Email Share Button
    Then I should see the Email button
    When I click the Email button
    Then I should have a correct Email share url
