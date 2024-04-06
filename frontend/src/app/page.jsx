'use client';
import React from 'react';
import { Image, Container, Title, Button, Group, Text, ThemeIcon, rem, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './page.module.css';
import { Icon3dRotate } from '@tabler/icons-react';
// Feature Section Imports
import { SimpleGrid, Grid } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';


//footer Imports

import Footer from './Footer';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Free to use',
    description: 'It is a free software that can be used by developers to create backend Querry.',
  },
  {
    icon: IconFileCode,
    title: 'Takes less Bandwidth',
    description: 'It takes only required bandwidth as compared to Rest APIs.',
  },
  {
    icon: IconCircleDotted,
    title: 'Reduces Manual Effort',
    description:
      'It automatically generates Querry as the developer has asked for it.',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Provide developers with a flexible and intuitive way to define data requirements and fetch only the necessary data, eliminating the need for multiple endpoints.      ',
  },
];

export default function Home() {

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Graph <span className={classes.highlight}>QL</span> Querry Language <br /> Backend Toolkit
            </Title>
            <Text c="dimmed" mt="md">
              GRAPHQL Backend Toolkit aims to simplify the development process that allows developers
              to write backend code in GRAPHQL easily and in less time
            </Text>

            <Group
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <Box>
                <b>Reduces Compelxity</b> – Learning GRAPHQL can be challenging for developers due to its unique syntax and concepts.
              </Box>
              <Box>
                <b>Free to use</b> – It is a free software that can be used by developers to create backend Querry.
              </Box>
              <Box>
                <b>Removes Problem of Under and Over Fetching</b> – When we use rest APIs it over fetch or under fetch data, but when we use GraphQl this problem gets solved.
              </Box>
            </Group>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Start Generating Querry
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Help
              </Button>
            </Group>
          </div>
          <Image src={'/og_image.webp'} className={classes.image} />
        </div>
      </Container>
      <Container size="md">
        <div className={classes.wrapper}>
          <Grid gutter={80}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Title className={classes.title} order={2}>
                A fully automated Querry Generator as well as Querry tester
              </Title>
              <Text c="dimmed">
                It will generate Querry as the developer want to use it in there website.
              </Text>

              <Button
                variant="gradient"
                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Start Generating Querry
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                {items}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </div>
      </Container>
      <Container size={'md'}>
      </Container>
<>
  {/* component */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')"
    }}
  />
  <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
    <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
            What people <br />
            are saying.
          </h1>
          <h3 className="text-xl mb-5 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className="text-center mb-10">
            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
            <span className="inline-block w-40 h-1 rounded-full bg-indigo-500" />
            <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
            <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
          </div>
        </div>
        <div className="-mx-3 md:flex items-start">
          <div className="px-3 md:w-1/3">
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=1" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Kenzie Edgar.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  sunt ratione dolor exercitationem minima quas itaque saepe
                  quasi architecto vel! Accusantium, vero sint recusandae cum
                  tempora nemo commodi soluta deleniti.
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=2" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Stevie Tifft.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum, dolor sit amet, consectetur adipisicing elit.
                  Dolore quod necessitatibus, labore sapiente, est, dignissimos
                  ullam error ipsam sint quam tempora vel.
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 md:w-1/3">
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=3" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Tommie Ewart.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vitae, obcaecati ullam excepturi dicta error deleniti sequi.
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=4" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Charlie Howse.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto inventore voluptatum nostrum atque, corrupti, vitae
                  esse id accusamus dignissimos neque reprehenderit natus, hic
                  sequi itaque dicta nisi voluptatem! Culpa, iusto.
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="px-3 md:w-1/3">
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=5" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Nevada Herbertson.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nobis, voluptatem porro obcaecati dicta, quibusdam sunt ipsum,
                  laboriosam nostrum facere exercitationem pariatur deserunt
                  tempora molestiae assumenda nesciunt alias eius? Illo, autem!
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-4 items-center">
                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                  <img src="https://i.pravatar.cc/100?img=6" alt="" />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-bold text-sm uppercase text-gray-600">
                    Kris Stanton.
                  </h6>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm leading-tight">
                  <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                    "
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem iusto, explicabo, cupiditate quas totam!
                  <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                    "
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
  <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
      <a
        title="Buy me a beer"
        href="https://www.buymeacoffee.com/scottwindon"
        target="_blank"
        className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
      >
        <img
          className="object-cover object-center w-full h-full rounded-full"
          src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
        />
      </a>
    </div>
  </div>
</>

      {/* footer return */}
      <Footer />
    </>
  );
}