Feature: Linkedin Network

  Background:
    Given I create a Linkedin Share Button

  @linkedin
  Scenario: Linkedin network should be displayed and have the correct URL
    When I click the Linkedin Share Button
    Then I should see the Linkedin button
    When I click the Linkedin button
    Then I should have a correct Linkedin share url
