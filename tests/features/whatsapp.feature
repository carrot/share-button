Feature: Whatsapp Network

  Background:
    Given I create a Whatsapp Share Button

  @whatsapp
  Scenario: Whatsapp network should be displayed and have the correct URL
    When I click the Whatsapp Share Button
    Then I should see the Whatsapp button
    When I click the Whatsapp button
    Then I should have a correct Whatsapp share url
