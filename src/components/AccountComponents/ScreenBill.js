import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default class ExampleFour extends Component {
    constructor(props) {
        super(props);
        const n = 18;
        const tableHead = ['Number', 'Point', 'Status', 'Progess'];

        const defaultState = Array.from({ length: n }, (_, index) => [`${index + 1}`, '2', '3', false]);
        this.state = {
            tableHead,
            tableData: defaultState,
        };
        this.loadButtonStates();
    }

    async loadButtonStates() {
        try {
            const buttonStates = await AsyncStorage.getItem('buttonStates');
            if (buttonStates !== null) {
                this.setState({ tableData: JSON.parse(buttonStates) });
            }
        } catch (error) {
            console.log("Error loading button states:", error);
        }
    }


    async saveButtonStates() {
        try {
            await AsyncStorage.setItem('buttonStates', JSON.stringify(this.state.tableData));
        } catch (error) {
            console.log("Error saving button states:", error);
        }
    }

    _toggleStatus(index) {
        const { tableData } = this.state;
        tableData[index][3] = !tableData[index][3];
        this.setState({ tableData }, () => this.saveButtonStates()); // Save button states after updating the state
    }

    _getStatusContent(status) {
        return status ? "Don't" : "Done";
    }

    _getStatusStyle(status) {
        return status ? styles.btnRed : styles.btnGreen;
    }

    render() {
        const state = this.state;

        return (
            <View style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {state.tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {rowData.map((cellData, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    data={
                                        cellIndex === 3 ? (
                                            <TouchableOpacity
                                                onPress={() => this._toggleStatus(index)}
                                            >
                                                <View style={this._getStatusStyle(cellData)}>
                                                    <Text style={styles.btnText}>
                                                        {this._getStatusContent(cellData)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            cellData
                                        )
                                    }
                                    textStyle={styles.text}
                                />
                            ))}
                        </TableWrapper>
                    ))}
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btnGreen: { width: 58, height: 18, backgroundColor: '#4CAF50', borderRadius: 2 },
    btnRed: { width: 58, height: 18, backgroundColor: '#FF0000', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
});
