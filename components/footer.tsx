import React from "react"
import { ActivityIndicator, Text, View } from "react-native"

export function ListFooter({
  isLoadingMore,
  hasMore,
}: {
  isLoadingMore?: boolean
  hasMore?: boolean
}) {
  
  
  if (isLoadingMore) {
    return (
      <View >
        <ActivityIndicator size="small" color="#2563EB" />
        <Text>Loading more...</Text>
      </View>
    )
  }

  if (!hasMore) {
    return (
      <View>
        <Text >You’ve reached the end</Text>
      </View>
    )
  }

  return null
}

