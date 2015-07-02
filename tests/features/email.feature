Feature: Email Network

  Background:
    Given I create an Email Share Button

  @email
  Scenario: Email network should be displayed and have the correct URL
    When I click the Email Share Button
    Then I should see the Email button
    When I click the Email button
    Then I should have a correct Email share url
