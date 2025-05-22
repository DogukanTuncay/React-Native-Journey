import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityTrackerScreen from '../src/screens/ActivityTrackerScreen';

// Sensör hooklarını mockla
jest.mock('react-native-sensors', () => {
  return {
    accelerometer: { subscribe: jest.fn(() => ({ unsubscribe: jest.fn() })) },
    gyroscope: { subscribe: jest.fn(() => ({ unsubscribe: jest.fn() })) },
    magnetometer: { subscribe: jest.fn(() => ({ unsubscribe: jest.fn() })) },
    setUpdateIntervalForType: jest.fn(),
    SensorTypes: { accelerometer: 1, gyroscope: 2, magnetometer: 3 },
  };
});

describe('ActivityTrackerScreen', () => {
  it('ekran render edilir ve başlıklar görünür', () => {
    const { getByText } = render(<ActivityTrackerScreen onNavigate={jest.fn()} />);
    expect(getByText('Sensör Verileri')).toBeTruthy();
    expect(getByText('Accelerometer (İvmeölçer)')).toBeTruthy();
    expect(getByText('Gyroscope (Jiroskop)')).toBeTruthy();
    expect(getByText('Magnetometer (Manyetometre)')).toBeTruthy();
  });

  it('Sensör başlıkları görünüyor', () => {
    const { getAllByText } = render(<ActivityTrackerScreen onNavigate={jest.fn()} />);
    expect(getAllByText(/İvmeölçer/i)[0]).toBeTruthy();
    expect(getAllByText(/Jiroskop/i)[0]).toBeTruthy();
    expect(getAllByText(/Manyetometre/i)[0]).toBeTruthy();
  });
}); 