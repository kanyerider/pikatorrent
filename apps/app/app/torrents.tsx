import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import Fuse from 'fuse.js'

import { TorrentCard, TorrentCardPlaceHolder } from '../components/TorrentCard'
import { useTorrents } from '../hooks/useTorrents'
import { Input, XStack, YStack, useMedia } from 'tamagui'
import { AddTorrentDialog } from '../dialogs/AddTorrentDialog'
import { SearchBar } from '../components/SearchBar'
import { DESKTOP_MAX_CONTENT_WIDTH } from '../constants/layout'
import { GlobalStats } from '../components/GlobalStats'

export default function Torrents() {
  const [filter, setFilter] = useState('')
  const media = useMedia()

  return (
    <YStack f={1}>
      <YStack px={media.gtXs ? '$8' : '$2'}>
        <XStack mx="auto" w="100%" maxWidth={DESKTOP_MAX_CONTENT_WIDTH}>
          <AddTorrentDialog />
          <SearchBar />
        </XStack>

        <XStack
          mx="auto"
          w="100%"
          py={media.gtXs ? '$4' : '$2'}
          jc="space-between"
          maxWidth={DESKTOP_MAX_CONTENT_WIDTH}
        >
          <Input
            br={50}
            minWidth={220}
            placeholder="Filter torrents list..."
            value={filter}
            onChangeText={setFilter}
          />
          <GlobalStats />
        </XStack>
      </YStack>
      <TorrentsList filter={filter} />
    </YStack>
  )
}

type TorrentsListProp = {
  filter: string
}

const TorrentsList = ({ filter }: TorrentsListProp) => {
  const { torrents } = useTorrents()
  const media = useMedia()

  const fuse = useMemo(
    () =>
      new Fuse(torrents, {
        keys: ['name'],
        findAllMatches: true,
        threshold: 0.3,
      }),
    [torrents]
  )

  const displayedTorrents =
    filter === '' ? torrents : fuse.search(filter).map((res) => res.item)

  if (torrents.length === 0) {
    return <TorrentCardPlaceHolder />
  }

  return (
    <FlatList
      contentContainerStyle={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: media.gtXs ? 46 : 7, // $8 $2
        paddingRight: media.gtXs ? 46 : 7, // $8 $2
        paddingTop: 4,
        paddingBottom: 4,
        maxWidth: DESKTOP_MAX_CONTENT_WIDTH + (media.gtXs ? 46 * 2 : 7 * 2),
      }}
      data={displayedTorrents || []}
      renderItem={({ item }) => <TorrentCard key={item.id} torrent={item} />}
    />
  )
}
