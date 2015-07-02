Feature: Linkedin Network

  Background:
    Given I create a Linkedin Share Button

  @linkedin
  Scenario: Display Linkedin Network
    When I click the Linkedin Share Button
    Then I should see the Linkedin button
    When I click the Linkedin button
    Then I should have a correct Linkedin share url
