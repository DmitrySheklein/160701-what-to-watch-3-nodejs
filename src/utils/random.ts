class Random {
  static int(min: number, max: number) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error(
        'Значение «до» меньшее, чем значение «от», или равное ему',
      );
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static float(min: number, max: number, fixNumberSigns = 2) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error(
        'Значение «до» меньшее, чем значение «от», или равное ему',
      );
    }
    return Number(Math.random() * (max - min) + min).toFixed(fixNumberSigns);
  }

  static itemFromArray<T>(array: T[]): T {
    return array[Random.int(0, array.length - 1)];
  }
}

class ArrayEnhanced extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  shuffle() {
    const newArray = Array.from(this);

    for (let i = newArray.length - 1; i > 0; i--) {
      const num = Math.floor(Math.random() * (i + 1));
      const buffer = newArray[num];
      newArray[num] = newArray[i];
      newArray[i] = buffer;
    }

    return newArray;
  }

  randomLength() {
    const newArray = Array.from(this);

    return this.shuffle().slice(0, Random.int(1, newArray.length - 1));
  }
}

export { Random, ArrayEnhanced };
