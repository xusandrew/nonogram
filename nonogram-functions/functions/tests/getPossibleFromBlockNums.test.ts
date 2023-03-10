import { getPossibleFromBlockNums } from '../src/difficultyCalculator'

test('Empty array', () => {
    expect(getPossibleFromBlockNums([], 0)).toStrictEqual([])
})

test('Empty block array but with size', () => {
    expect(getPossibleFromBlockNums([], 5)).toStrictEqual([0,0,0,0,0])
})

test('Array length 1', () => {
    expect(getPossibleFromBlockNums([1], 1)).toStrictEqual([1])
})

test('Filled row', () => {
    expect(getPossibleFromBlockNums([5], 5)).toStrictEqual([1,1,1,1,1])
})

test('Block is size - 1', () => {
    expect(getPossibleFromBlockNums([4], 5)).toStrictEqual([0,1,1,1,0])
})

test('Multiple blocks with no extra space', () => {
    expect(getPossibleFromBlockNums([2, 2], 5)).toStrictEqual([1,1,0,1,1])
})

test('Multiple blocks with extra space', () => {
    expect(getPossibleFromBlockNums([2, 2], 6)).toStrictEqual([0,1,0,0,1,0])
})

