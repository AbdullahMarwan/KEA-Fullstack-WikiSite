import React from "react";
import {
  HStack,
  Box,
  Text,
  Image,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useMovie } from "../../context/MovieContext";

function MediaVideos() {
  const {
    movie,
    selectedTrailer,
    isLoadingTrailers,
    videos,
    images,
    activeMediaTab,
    loading,
  } = useMovie();

  if (!movie) return null;

  // Function to render skeleton loaders for different content types
  const renderSkeletons = (contentType: string) => {
    switch (contentType) {
      case "videos":
        return (
          <Flex>
            {[...Array(4)].map((_, index) => (
              <Box
                key={index}
                width="50%"
                height="300px"
                marginRight="20px"
                flex="0 0 auto"
              >
                <Skeleton height="300px" width="100%" borderRadius="8px" />
                <SkeletonText mt="2" noOfLines={1} spacing="2" />
              </Box>
            ))}
          </Flex>
        );
      case "backdrops":
        return (
          <Flex>
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                width="500px"
                height="281px"
                marginRight="20px"
                flex="0 0 auto"
                borderRadius="8px"
              />
            ))}
          </Flex>
        );
      case "posters":
        return (
          <Flex>
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                width="150px"
                height="225px"
                marginRight="20px"
                flex="0 0 auto"
                borderRadius="8px"
              />
            ))}
          </Flex>
        );
      case "popular":
        return (
          <Box>
            <HStack alignItems="flex-start" spacing={4} mb={6}>
              <Box
                width="50%"
                height="300px"
                borderRadius="8px"
                overflow="hidden"
              >
                <Skeleton
                  width="100%"
                  height="100%"
                  borderRadius="8px"
                  startColor="gray.100"
                  endColor="gray.300"
                />
              </Box>
              <Box
                width="50%"
                height="300px"
                borderRadius="8px"
                overflow="hidden"
              >
                <Skeleton
                  width="100%"
                  height="100%"
                  borderRadius="8px"
                  startColor="gray.100"
                  endColor="gray.300"
                />
              </Box>
            </HStack>
            <Flex mt="4">
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  width="150px"
                  height="225px"
                  marginRight="20px"
                  flex="0 0 auto"
                  borderRadius="8px"
                  overflow="hidden"
                >
                  <Skeleton
                    width="100%"
                    height="100%"
                    borderRadius="8px"
                    startColor="gray.100"
                    endColor="gray.300"
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        );
    }
  };

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeMediaTab) {
      case "videos":
        return (
          <Box width="100%" position="relative">
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              right={0}
              height="100%"
              width="60px"
              zIndex={2}
              pointerEvents="none"
              background="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)"
            />

            {/* Scrollable content */}
            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              padding="10px"
              boxSizing="border-box"
              css={{
                "&::-webkit-scrollbar": { height: "4px" },
                "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "2px",
                },
              }}
            >
              {isLoadingTrailers ? (
                renderSkeletons("videos")
              ) : (
                <Flex>
                  {videos && videos.length > 0 ? (
                    videos.map((video, index) => (
                      <Box
                        key={video.id || index}
                        width="50%"
                        marginRight="20px"
                        flex="0 0 auto"
                      >
                        <Box
                          position="relative"
                          height="300px"
                          width="100%"
                          borderRadius="8px"
                          overflow="hidden"
                        >
                          {/* Thumbnail image */}
                          <Image
                            src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                            alt={video.name}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            borderRadius="8px"
                          />

                          {/* Play button overlay */}
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            width="60px"
                            height="60px"
                            borderRadius="50%"
                            bg="rgba(0,0,0,0.7)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Box
                              width="0"
                              height="0"
                              borderTop="15px solid transparent"
                              borderBottom="15px solid transparent"
                              borderLeft="25px solid white"
                              marginLeft="5px"
                            />
                          </Box>

                          {/* iframe */}
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            zIndex="1"
                          >
                            <iframe
                              title={`${movie.title} - ${video.name}`}
                              src={`https://www.youtube.com/embed/${video.key}`}
                              allowFullScreen
                              style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                        </Box>
                        <Text fontSize="sm" mt={2} noOfLines={1}>
                          {video.name}
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Box
                      width="50%"
                      height="300px"
                      bg="gray.100"
                      borderRadius="8px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>No videos available</Text>
                    </Box>
                  )}
                </Flex>
              )}
            </Box>
          </Box>
        );

      case "backdrops":
        return (
          <Box width="100%" position="relative">
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              right={0}
              height="100%"
              width="60px"
              zIndex={2}
              pointerEvents="none"
              background="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)"
            />

            {/* Scrollable content */}
            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              padding="10px"
              boxSizing="border-box"
              css={{
                "&::-webkit-scrollbar": { height: "4px" },
                "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "2px",
                },
              }}
            >
              {loading ? (
                renderSkeletons("backdrops")
              ) : (
                <Flex>
                  {images?.backdrops && images.backdrops.length > 0 ? (
                    images.backdrops.map((backdrop, index) => (
                      <Box
                        key={index}
                        width="500px"
                        height="281px"
                        marginRight="20px"
                        flex="0 0 auto"
                        borderRadius="8px"
                        overflow="hidden"
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w1280${backdrop.file_path}`}
                          alt={`${movie.title} backdrop ${index + 1}`}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          borderRadius="8px"
                        />
                      </Box>
                    ))
                  ) : (
                    <Box
                      width="500px"
                      height="281px"
                      bg="gray.100"
                      borderRadius="8px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>No backdrops available</Text>
                    </Box>
                  )}
                </Flex>
              )}
            </Box>
          </Box>
        );

      case "posters":
        return (
          <Box width="100%" position="relative">
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              right={0}
              height="100%"
              width="60px"
              zIndex={2}
              pointerEvents="none"
              background="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)"
            />

            {/* Scrollable content */}
            <Box
              overflowX="auto"
              whiteSpace="nowrap"
              padding="10px"
              boxSizing="border-box"
              css={{
                "&::-webkit-scrollbar": { height: "4px" },
                "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "2px",
                },
              }}
            >
              {loading ? (
                renderSkeletons("posters")
              ) : (
                <Flex>
                  {images?.posters && images.posters.length > 0 ? (
                    images.posters.map((poster, index) => (
                      <Box
                        key={index}
                        width="150px"
                        height="225px"
                        marginRight="20px"
                        flex="0 0 auto"
                        borderRadius="8px"
                        overflow="hidden"
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                          alt={`${movie.title} poster ${index + 1}`}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          borderRadius="8px"
                        />
                      </Box>
                    ))
                  ) : (
                    <Box
                      width="150px"
                      height="225px"
                      bg="gray.100"
                      borderRadius="8px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>No posters available</Text>
                    </Box>
                  )}
                </Flex>
              )}
            </Box>
          </Box>
        );

      case "popular":
      default:
        return (
          <Box width="100%" position="relative">
            {loading || isLoadingTrailers ? (
              renderSkeletons("popular")
            ) : (
              <>
                {/* Featured content */}
                <HStack alignItems="flex-start" spacing={4} mb={6}>
                  {selectedTrailer && (
                    <Box
                      width="50%"
                      position="relative"
                      borderRadius="8px"
                      overflow="hidden"
                      height="300px"
                    >
                      {/* YouTube thumbnail as placeholder */}
                      <Image
                        src={`https://img.youtube.com/vi/${selectedTrailer.key}/hqdefault.jpg`}
                        alt={selectedTrailer.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius="8px"
                      />

                      {/* Play button overlay */}
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        width="60px"
                        height="60px"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.7)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          width="0"
                          height="0"
                          borderTop="15px solid transparent"
                          borderBottom="15px solid transparent"
                          borderLeft="25px solid white"
                          marginLeft="5px"
                        />
                      </Box>

                      {/* Iframe positioned absolutely, will be on top when loaded */}
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        zIndex="1"
                      >
                        <iframe
                          title={`${movie.title} trailer`}
                          src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                          allowFullScreen
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  {images?.backdrops && images.backdrops.length > 0 && (
                    <Box
                      width={selectedTrailer ? "50%" : "100%"}
                      height="300px"
                      borderRadius="8px"
                      overflow="hidden"
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${images.backdrops[0].file_path}`}
                        alt={`${movie.title} backdrop`}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Box>
                  )}
                </HStack>

                {/* Scrollable posters if available */}
                {images?.posters && images.posters.length > 0 && (
                  <Box mt={4} position="relative">
                    <Text fontWeight="bold" mb={2}>
                      Posters
                    </Text>

                    <Box
                      position="absolute"
                      top="30px"
                      right={0}
                      height="calc(100% - 30px)"
                      width="60px"
                      zIndex={2}
                      pointerEvents="none"
                      background="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)"
                    />

                    <Box
                      overflowX="auto"
                      whiteSpace="nowrap"
                      padding="10px"
                      boxSizing="border-box"
                      css={{
                        "&::-webkit-scrollbar": { height: "4px" },
                        "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#888",
                          borderRadius: "2px",
                        },
                      }}
                    >
                      <Flex>
                        {images.posters.map((poster, index) => (
                          <Box
                            key={index}
                            width="150px"
                            height="225px"
                            marginRight="20px"
                            flex="0 0 auto"
                            borderRadius="8px"
                            overflow="hidden"
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                              alt={`${movie.title} poster ${index + 1}`}
                              width="100%"
                              height="100%"
                              objectFit="cover"
                              borderRadius="8px"
                            />
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        );
    }
  };

  return <Box width="100%">{renderContent()}</Box>;
}

export default MediaVideos;
