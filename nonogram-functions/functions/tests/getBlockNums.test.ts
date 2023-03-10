import { getBlockNums } from '../src/difficultyCalculator'

test('Empty Array', () => {
    expect(getBlockNums([])).toStrictEqual([])
})

test('Single block', () => {
    expect(getBlockNums([1,1,1,1,1,1,0])).toStrictEqual([6])
})

test('Multiple blocks', () => {
    expect(getBlockNums([1,1,1,1,0,0,1])).toStrictEqual([4,1])
})
