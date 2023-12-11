import React from 'react'
import {
  Button,
  Label,
  Paragraph,
  XStack,
  YStack,
  useMedia,
  useThemeName,
} from 'tamagui'
import { SessionsInfoDialog } from '../dialogs/SessionInfoDialog'
import { useSession } from '../hooks/useSession'

import { version } from '../package.json'
import { DESKTOP_MAX_CONTENT_WIDTH } from '../constants/layout'
import { ExternalLink, Github, MessageSquare } from '@tamagui/lucide-icons'
import { openExternalLink } from '../lib/links'
import { StatsDialog } from '../dialogs/StatsDialogs'
import { useI18n } from '../hooks/use18n'

export default function About() {
  const i18n = useI18n()
  const { session } = useSession()
  const media = useMedia()
  const theme = useThemeName()

  return (
    <YStack
      w="100%"
      flexShrink={1}
      gap="$4"
      px={media.gtXs ? '$8' : '$2'}
      alignSelf="center"
      {...(media.gtXs && { w: DESKTOP_MAX_CONTENT_WIDTH })}
    >
      <XStack jc="space-between">
        <Paragraph>{i18n.t('about.pikatorrentVersion')}</Paragraph>
        <Paragraph id="pikaTorrentVersion">{version}</Paragraph>
      </XStack>
      <XStack jc="space-between">
        <Paragraph>{i18n.t('about.transmissionVersion')}</Paragraph>
        <Paragraph id="transmissionVersion">{session['version']}</Paragraph>
      </XStack>
      <SessionsInfoDialog session={session} />
      <StatsDialog />
      <XStack mx="auto" mt="$8" gap="$2">
        <Paragraph>{i18n.t('about.reportBugOrFeature')}</Paragraph>
      </XStack>
      <Button
        bc={theme.startsWith('light') ? 'white' : 'black'}
        theme="yellow"
        hoverTheme
        borderColor={'$yellow7'}
        icon={ExternalLink}
        iconAfter={Github}
        onPress={() =>
          openExternalLink('https://www.github.com/G-Ray/pikatorrent/issues')
        }
      >
        <Paragraph>{i18n.t('about.githubLinkDescription')}</Paragraph>
      </Button>
      <Button
        bc={theme.startsWith('light') ? 'white' : 'black'}
        theme="yellow"
        hoverTheme
        borderColor={'$yellow7'}
        icon={ExternalLink}
        iconAfter={MessageSquare}
        onPress={() => openExternalLink('https://discord.gg/6HxCV4aGdy')}
      >
        <Paragraph>{i18n.t('about.discordLinkDescription')}</Paragraph>
      </Button>
    </YStack>
  )
}
