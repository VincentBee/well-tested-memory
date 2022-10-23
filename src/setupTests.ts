import '@testing-library/jest-dom';
import 'jest-styled-components'
import { mockGenerateRandom } from './given';

jest.mock('./utils', () => ({
  generateRandom: mockGenerateRandom
}))

