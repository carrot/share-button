Feature: Network Ordering

  Background:
    Given I create a network ordering Share Button

  @ordering
  Scenario: The networks should be displayed in the correct order
    When I click the network ordering Share Button
    Then I should see the correct number of networks
    And They should be in the correct order
