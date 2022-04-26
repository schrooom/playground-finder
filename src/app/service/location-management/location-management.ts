export class LocationOption {
  type: LocationOptionType
  value: any

  static privacyLevel(option: LocationOption): LocationPrivacyLevel {
    const privacyLevel =
      option.value / (LocationOptionType.steps(option.type).length - 1)
    const privacyLevels = Object.keys(LocationPrivacyLevel).length / 2 - 1
    return privacyLevels - privacyLevel * privacyLevels
  }

  static qualityLevel(option: LocationOption): LocationQualityLevel {
    const usabilityLevel =
      option.value / (LocationOptionType.steps(option.type).length - 1)
    const usabilityLevels = Object.keys(LocationQualityLevel).length / 2 - 1
    return usabilityLevel * usabilityLevels
  }

  static combinedPrivacyLevel(options: LocationOption[]): LocationPrivacyLevel {
    const privacyLevels = options
      .map((o) => Number(LocationOption.privacyLevel(o)))
      .reduce((a, b) => a + b, 0)
    return privacyLevels / options.length
  }

  static combinedQualityLevel(options: LocationOption[]): LocationQualityLevel {
    const usabilityLevels = options
      .map((o) => Number(LocationOption.qualityLevel(o)))
      .reduce((a, b) => a + b, 0)
    return usabilityLevels / options.length
  }
}

export namespace LocationOptionType {
  export function title(type: LocationOptionType): string {
    return `location-option.${type}.title`
  }

  export function subtitle(type: LocationOptionType): string {
    return `location-option.${type}.subtitle`
  }

  export function description(type: LocationOptionType): string {
    return `location-option.${type}.description`
  }

  export function optionDescription(type: LocationOptionType): string {
    return `location-option.${type}.detailDescription`
  }

  export function icon(type: LocationOptionType): string {
    switch (type) {
      case LocationOptionType.accuracy:
        return 'pin-outline'
      case LocationOptionType.interval:
        return 'timer-outline'
      case LocationOptionType.playgrounds:
        return 'balloon-outline'
      case LocationOptionType.navigation:
        return 'navigate-outline'
    }
  }

  export function minIcon(type: LocationOptionType): string {
    return ''
    // TODO: potentially reenable later
    /*
    switch (type) {
      case LocationOptionType.accuracy:
        return 'expand-outline'
      case LocationOptionType.interval:
        return 'play-outline'
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return ''
    }
    */
  }

  export function maxIcon(type: LocationOptionType): string {
    return ''
    // TODO: potentially reenable later
    /*
    switch (type) {
      case LocationOptionType.accuracy:
        return 'contract-outline'
      case LocationOptionType.interval:
        return 'play-forward-outline'
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return ''
    }
    */
  }

  export function group(type: LocationOptionType): LocationOptionGroup {
    switch (type) {
      case LocationOptionType.accuracy:
      case LocationOptionType.interval:
        return LocationOptionGroup.preference
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return LocationOptionGroup.useCase
    }
  }

  export function dataType(type: LocationOptionType): LocationOptionDataType {
    switch (type) {
      case LocationOptionType.accuracy:
      case LocationOptionType.interval:
        return LocationOptionDataType.number
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return LocationOptionDataType.boolean
    }
  }

  export function steps(type: LocationOptionType): number[] {
    switch (type) {
      case LocationOptionType.accuracy:
        return [1000, 500, 100, 0]
      case LocationOptionType.interval:
        return [1800, 600, 60, 0]
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return [0, 0]
    }
  }

  export function stepLabels(type: LocationOptionType): string[] {
    switch (type) {
      case LocationOptionType.accuracy:
        return [
          'very coarse',
          'coarse',
          'fairly accurate',
          'as accurate as possible',
        ]
      case LocationOptionType.interval:
        return [
          'very infrequent',
          'infrequent',
          'fairly frequent',
          'as frequent as possible',
        ]
      case LocationOptionType.playgrounds:
      case LocationOptionType.navigation:
        return []
    }
  }
}

export enum LocationOptionType {
  accuracy = 'accuracy',
  interval = 'interval',
  playgrounds = 'playgrounds',
  navigation = 'navigation',
}

export enum LocationOptionDataType {
  boolean = 'boolean',
  number = 'number',
}

export enum LocationPrivacyLevel {
  low = 0,
  mediumLow = 1,
  mediumHigh = 2,
  high = 3,
}

export enum LocationQualityLevel {
  low = 0,
  mediumLow = 1,
  mediumHigh = 2,
  high = 3,
}

enum LocationOptionGroup {
  useCase = 'useCase',
  preference = 'preference',
}
