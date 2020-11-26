import React from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Image, Dimensions } from 'react-native'
import colors from "../../utils/colors";
import { connect } from "react-redux";
import { Avatar, Text } from 'react-native-elements';
import Button from '../../Components/Button';
import EmptyList from "../../Components/EmptyList";
import { FormatPrice } from "../../utils/helper";

const size = Dimensions.get('window').width / 3;

const Store = ({ bussiness }) => {

    console.log(bussiness.logo)
    const mockData = [
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        }, {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
        {
            img: "https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=7c43f2cd89eac4a87a19038045b85da4&oe=5FE9663C 640w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=ba1ac8f51aa0de8ee6328835c43b2ffa&oe=5FEA1C80 750w,https://instagram.flhe7-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/126152956_677934149778489_5308075462125469485_n.jpg?_nc_ht=instagram.flhe7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=WPzSYQB4e1EAX_5ZSwY&tp=1&oh=140e7d2f492d3f351a61be70f188d049&oe=5FE8B7FF 1080w",
            title: "Pampers",
            Price: "123"
        },
    ]



    const reload = () => {
        productGet(0);
    };

    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri:
                                "data:image/png;base64," + bussiness.logo,
                        }}
                    />
                </View>

                <View style={{ flex: 2 }}>
                    <Text h4>Junaid Garments</Text>
                    <View style={{ paddingVertical: 10, }} >
                        <Text> 60 New Orders </Text>
                    </View>
                    <View style={{ paddingVertical: 10, }} >
                        <Text >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its </Text>
                    </View>
                    <Button title={"EDIT_BUSSINESS_INFO"} onClick={() => { }} sm={true} />
                </View>



            </View>

            <View>
                <FlatList
                    numColumns={2}
                    data={mockData}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={reload} />
                    }
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image
                                source={{ uri: item.img }}
                                style={{ width: 100, height: 100 }}
                            />
                            <Text> {item.title} </Text>
                            <Text> {FormatPrice(item.Price)} </Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <EmptyList message="Nothing to Show, Please Reload or Add Data" />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.lightColor,
        padding: 5
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20
    },
    list: {
        display: "flex",
    },
    item: {
        borderWidth: 1,
        width: 150,
        height: 150,
        margin: 10
    }

});

const mapStateToProps = ({ common, bussiness }) => {
    return {
        loading: common.loading,
        bussiness: bussiness.bussiness,
        language: common.language,
    };
};

export default connect(mapStateToProps, null)(Store);