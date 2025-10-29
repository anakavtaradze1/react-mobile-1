import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <FlatList
      bounces={false}
      data={products}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageIconContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              contentFit="contain"
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton} activeOpacity={0.5}>
                <Text style={styles.iconText}>↗</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} activeOpacity={0.5}>
                <Text style={styles.iconText}>♡</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text
            style={styles.itemDescription}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {item.rating.rate}</Text>
            <Text style={styles.ratingCount}>
              ({item.rating.count} reviews)
            </Text>
          </View>

          <Text style={styles.itemPrice}>${item.price}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cartButton}
              activeOpacity={0.2}
              onPress={() => {}}
            >
              <Text style={styles.cartIcon}>🛒</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addCartButton}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Text style={styles.addCartText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "#eceaeaff",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#c8c6c6ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  itemImage: {
    width: 120,
    height: 120,
  },
  itemTitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  itemPrice: {
    fontSize: 20,
    color: "#000000ff",
    fontWeight: "800",
  },
  itemDescription: {
    marginVertical: 8,
    fontSize: 13,
    color: "#555555ff",
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cartIcon: {
    fontSize: 18,
  },
  addCartButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginLeft: 16,
    alignItems: "center",
  },
  addCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  imageIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    marginLeft: 16,
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  iconText: {
    fontSize: 16,
    color: "#000000ff",
  },
});
