import React from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { AuthContext } from "../../views/context/AuthContext";
import { DataTable } from 'react-native-paper';
import axios from "axios";
import data from "../../storage/database/post";

const ScreenBill = () => {
    const { userProfile, accessToken } = React.useContext(AuthContext);
    const [invoice, setInvoice] = React.useState([]);
    React.useEffect(() => {
        if (userProfile) {
            axios
                .get(`https://trading-stuff-be-iphg.vercel.app/invoice/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken.accessToken}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setInvoice(response.data.data.invoice)
                })
                .catch((error) => {
                    console.log("error", error);
                })
                .finally((loading) => { });
        }
    }, [userProfile]);


    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Progess</DataTable.Title>

                    <DataTable.Title numeric>Point</DataTable.Title>

                </DataTable.Header>
                {/* {invoice?.map((data) => {
                    < DataTable.Row >
                        <DataTable.Cell>s</DataTable.Cell>
                        <DataTable.Cell>s</DataTable.Cell>
                        <DataTable.Cell>john@kindacode.com</DataTable.Cell>
                        <DataTable.Cell numeric>33</DataTable.Cell>
                    </DataTable.Row>
                })} */}

            </DataTable>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 30,
    },
});

export default ScreenBill;
