import React, {useState} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Blogs = () => {

  const [statusUsers, setStatusUsers] = useState([
    { id: 1, name: 'User 1 large name', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
    { id: 2, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
    { id: 3, name: 'User lx name here', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
    { id: 4, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
    { id: 5, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
    { id: 6, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
    { id: 7, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar7.png' },
    { id: 8, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
    { id: 9, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
    { id: 10, name: 'User 2', avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 1,
      username: 'User 1',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      date: 'May 18, 2023',
      description: 'Vote for Imran Khan, Vote for Freedom',
      imageUrl: 'https://img.freepik.com/premium-vector/law-firm-social-media-post-design-law-justice-web-banner-design-legal-web-template_71956-1225.jpg',
    },
    {
      id: 2,
      userId: 2,
      username: 'User 2',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      date: 'May 17, 2023',
      description: ' Law posts often offer expert analysis and commentary on legal issues, providing insights and perspectives from legal professionals, scholars, and practitioners.',
      imageUrl: null,
    },

    {
      id: 3,
      userId: 1,
      username: 'User 1',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      date: 'May 18, 2023',
      description: 'The purpose of law posts is to inform, educate, and engage readers on legal matters. They can be found on various platforms, including legal blogs, news websites, social media, and legal forums.',
      imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/law-and-attorney-studio-instagram-post-advert-design-template-2584ddb7f7854343e635f11dbde0e18b.jpg?ts=1705703996',
    },
  ])

  const UserListItem = ({ user }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <Text style={styles.statusUserName} ellipsizeMode='tail' numberOfLines={1}>{user.name}</Text>
    </View>
  );
  
  const PostCard = ({ post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatarUrl }} style={styles.postAvatar} />
        <Text style={styles.postUsername}>{post.username}</Text>
        <Text style={styles.postDate}>{post.date}</Text>
      </View>
      <Text style={styles.postDescription}>{post.description}</Text>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", justifyContent:"space-between", marginHorizontal:10}}>
        <Text style={styles.title}>Featured Group Chats</Text>
        <FontAwesome name="balance-scale" size={30} color="#294c85" />
        </View>
      <ScrollView horizontal>
        <View style={styles.userContainer}>
          {statusUsers.map(user => <UserListItem key={user.id} user={user} />)}
        </View>
      </ScrollView>

      <FlatList
        data={posts}
        contentContainerStyle={styles.postListContainer}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}

      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    paddingBottom:120,
  },
  userContainer: {
    flexDirection: 'row',
    padding: 10,
    height:100,
    marginHorizontal:10,
  },
  userItem: {
    marginRight: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  statusUserName:{
    marginTop:5,
    fontSize:12,
    color:'#483D8B',
    width:60,
    textAlign:'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postListContainer:{
    paddingTop:20,
    paddingHorizontal:15,
  },
  postCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postUsername: {
    flex: 1,
  },
  postDate: {
    fontSize: 12,
    color:'#A9A9A9',
  },
  postDescription:{
    fontSize:16,
    color:'#00008B'
  },
  postImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: 10,
  },
  postButton: {
    marginRight: 10,
  },
  postButtonText:{
    color:'#808080'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#294c85",
    marginHorizontal:10,
  },
});

export default Blogs;