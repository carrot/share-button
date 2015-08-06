Feature: Meta Tag Inheritance

  Background:
    Given I create and click a meta tag Share Button

  @meta
  Scenario: Network URLs should inherit meta tag properties
    When I click all the network buttons
    Then All buttons should have valid URLs
