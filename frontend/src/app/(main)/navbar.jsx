import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import Link from 'next/link';

const mockdata = [
  {
    icon: IconCode,
    title: 'Log In First',
  }
];

function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.link}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={5}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">


          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            {/* <HoverCard width={190} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="./login" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                    GraphQlClient
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(20), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                {links}
                <a href="./login"><Button variant="default">Log in</Button></a>

              </HoverCard.Dropdown>
            </HoverCard> */}
            {/* <HoverCard width={190} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="./login" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                    CodeGenerator
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(20), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                {links}
                <a href="./login"><Button variant="default">Log in</Button></a>

              </HoverCard.Dropdown>
            </HoverCard> */}
            <Link href="../user/graphql-client" className={classes.link}>
              GraphQlClient
            </Link>
            <Link href="../user/manage-project" className={classes.link}>
              Code Generator
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Link href="./login"><Button variant="default">Log in</Button></Link>
            <Link href="./signup"> <Button>Sign up</Button></Link>

          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="../" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <a href="./login"><Button variant="default">Log in</Button></a>

            <a href="./signup"><Button>Sign up</Button></a>

          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;