export interface RawEnvironmentReading {
    temperature: number;
    humidity: number;
}

export interface EnvironmentReading extends RawEnvironmentReading {
    timestamp: Date;
}
