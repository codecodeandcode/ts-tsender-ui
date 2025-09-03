import { describe, it, expect } from 'vitest'
import { caculateTotal } from "./caculateTotal";

describe('caculateTotal', () => {
    it('should return 0 for empty string', () => {
        expect(caculateTotal('')).toBe(0)
        expect(caculateTotal('   ')).toBe(0)
    })

    it('should sum numbers separated by commas', () => {
        expect(caculateTotal('1,2,3')).toBe(6)
        expect(caculateTotal('10,20,30')).toBe(60)
    })

    it('should sum numbers separated by spaces', () => {
        expect(caculateTotal('1 2 3')).toBe(6)
        expect(caculateTotal('5  15 25')).toBe(45)
    })

    it('should sum numbers separated by commas and spaces', () => {
        expect(caculateTotal('1, 2 3,4')).toBe(10)
        expect(caculateTotal('10, 20 30, 40')).toBe(100)
    })

    it('should ignore invalid numbers', () => {
        expect(caculateTotal('1,2,abc,3')).toBe(6)
        expect(caculateTotal('5, ,10,foo')).toBe(15)
    })
})