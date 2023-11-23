import React, { useState } from "react";
import "./TimePickerCustom.css";

interface TimePickerProps {
    value: [string, string];
    onChange: (value: [string, string]) => void;
}

const TimePickerCustom: React.FC<TimePickerProps> = ({ value, onChange }) => {
    const [selectedTimes, setSelectedTimes] = useState<[string, string]>(value);

    const handleTimeSelection = (time: string) => {
        setSelectedTimes((prevSelectedTimes) => {
            if (prevSelectedTimes[0] && prevSelectedTimes[1]) {
                // Reset selection if both start and end times are already selected
                return [time, ""];
            }

            if (!prevSelectedTimes[0]) {
                // Set start time if it's not selected
                return [time, ""];
            }

            // Set end time
            const [start, end] = [prevSelectedTimes[0], time].sort();
            onChange([start, end]);

            return [start, end];
        });
    };

    const timeSlots = [
        "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
        "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
    ];



    const isTimeBetweenSelection = (time: string) => {
        if (selectedTimes[0] && selectedTimes[1]) {
            return time >= selectedTimes[0] && time <= selectedTimes[1];
        }
        return false;
    };

    return (
        <div className="time-picker-wrapper">
            <div className="time-slot-grid">
                {timeSlots.map((time) => (
                    <div
                        key={time}
                        className={`time-slot ${selectedTimes[0] === time || selectedTimes[1] === time
                                ? "selected"
                                : isTimeBetweenSelection(time)
                                    ? "between"
                                    : ""
                            }`}
                        onClick={() => handleTimeSelection(time)}
                    >
                        {time}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimePickerCustom;



