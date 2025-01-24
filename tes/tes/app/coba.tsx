import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Coba = () => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState({ day: '', month: '', year: '' });
    const [time, setTime] = useState({ hour: '', minute: '', period: 'AM' });
    const [tasks, setTasks] = useState<{ task: string; date: string; time: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkTaskTimes();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [tasks]);

    const resetFields = () => {
        setTask('');
        setDate({ day: '', month: '', year: '' });
        setTime({ hour: '', minute: '', period: 'AM' });
    };

    const addTask = () => {
        const { day, month, year } = date;
        const { hour, minute, period } = time;

        if (!task.trim()) {
            alert('Task cannot be empty');
            return;
        }

        if (!day || !month || !year || !hour || !minute) {
            alert('All fields must be filled');
            return;
        }

        if (parseInt(month) > 12) {
            alert('Month cannot be greater than 12');
            return;
        }

        if (parseInt(year) < 2025) {
            alert('Year must be 2025 or later');
            return;
        }

        const daysInMonth = [31, (parseInt(year) % 4 === 0 && (parseInt(year) % 100 !== 0 || parseInt(year) % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (parseInt(day) < 1 || parseInt(day) > daysInMonth[parseInt(month) - 1]) {
            alert(`Invalid day for the selected month. The month ${month} in ${year} has ${daysInMonth[parseInt(month) - 1]} days`);
            return;
        }

        if (parseInt(hour) < 1 || parseInt(hour) > 12) {
            alert('Hour must be between 1 and 12');
            return;
        }

        if (parseInt(minute) < 0 || parseInt(minute) > 59) {
            alert('Minute must be between 0 and 59');
            return;
        }

        setTasks([...tasks, {
            task,
            date: `${day}/${month}/${year}`,
            time: `${hour}:${minute} ${period}`
        }]);

        resetFields();
    };

    const checkTaskTimes = () => {
        const now = new Date();
        tasks.forEach(task => {
            const [day, month, year] = task.date.split('/').map(Number);
            const [hourMinute, period] = task.time.split(' ');
            const [hour, minute] = hourMinute.split(':').map(Number);
            const taskDate = new Date(year, month - 1, day, period === 'PM' ? hour + 12 : hour, minute);

            const timeDifference = (taskDate.getTime() - now.getTime()) / 60000; // Difference in minutes

            if (timeDifference > 0 && timeDifference <= 5) {
                Alert.alert('Reminder', `Task "${task.task}" is due in ${Math.ceil(timeDifference)} minutes`);
            }
        });
    };

    const deleteTask = (index: number): void => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To Do List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a task"
                value={task}
                onChangeText={setTask}
            />
            <View style={styles.dateTimeContainer}>
                <TextInput
                    style={styles.dateInput}
                    placeholder="DD"
                    keyboardType="numeric"
                    maxLength={2}
                    value={date.day}
                    onChangeText={(text) => setDate({ ...date, day: text })}
                />
                <Text style={styles.separator}>/</Text>
                <TextInput
                    style={styles.dateInput}
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    value={date.month}
                    onChangeText={(text) => setDate({ ...date, month: text })}
                />
                <Text style={styles.separator}>/</Text>
                <TextInput
                    style={styles.dateInput}
                    placeholder="YYYY"
                    keyboardType="numeric"
                    maxLength={4}
                    value={date.year}
                    onChangeText={(text) => setDate({ ...date, year: text })}
                />
            </View>
            <View style={styles.dateTimeContainer}>
                <TextInput
                    style={styles.dateInput}
                    placeholder="HH"
                    keyboardType="numeric"
                    maxLength={2}
                    value={time.hour}
                    onChangeText={(text) => setTime({ ...time, hour: text })}
                />
                <Text style={styles.separator}>:</Text>
                <TextInput
                    style={styles.dateInput}
                    placeholder="MM"
                    keyboardType="numeric"
                    maxLength={2}
                    value={time.minute}
                    onChangeText={(text) => setTime({ ...time, minute: text })}
                />
                <View style={styles.periodInput}>
                    <Picker
                        selectedValue={time.period}
                        onValueChange={(itemValue) => setTime({ ...time, period: itemValue })}
                        style={{ height: 40, width: 80 }}
                    >
                        <Picker.Item label="AM" value="AM" />
                        <Picker.Item label="PM" value="PM" />
                    </Picker>
                </View>
            </View>
            <Button title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.taskContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.task}>{item.task}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteTask(index)}>
                            <Text style={{ color: 'red', fontSize: 16 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateInput: {
        height: 40,
        width: 50,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginHorizontal: 2,
    },
    separator: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    periodInput: {
        height: 40,
        width: 80,
        marginHorizontal: 2,
    },
    taskContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    task: {
        fontSize: 18,
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    time: {
        fontSize: 14,
        color: 'gray',
    },
});

export default Coba;
