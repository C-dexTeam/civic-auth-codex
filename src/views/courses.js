import LevelBar from "@/components/bar/LevelBar";
import GradientCard from "@/components/card/GradientCard";
import DefaultTextField from "@/components/form/components/DefaultTextField";
import { AuthContext } from "@/context/AuthContext";
import { getAllCourses, getCourses, getPopularCourses } from "@/store/courses/coursesSlice";
import { getAllPlanguages } from "@/store/planguages/planguagesSlice";
import { Search, Shield, Web } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlashOn } from "@mui/icons-material"; // Strike icon
import { getStrike } from "@/store/profile/profileSlice";
import CourseCard from "@/components/card/CourseCard";

const Courses = () => {
  const [value, setValue] = useState(0);
  const [copy, setCopy] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const dispatch = useDispatch();
  const { planguages: planguagesSlice } = useSelector(
    (state) => state
  );

  const courses = useSelector(getCourses);

  const { user, loading } = useContext(AuthContext);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  useEffect(() => {
    console.log("asdadasd");

    dispatch(
      getAllCourses({
        page: 1,
        limit: 10,
        title: search,
        pLanguageID: selectedLanguage,
      })
    );
    console.log("asdadasd1");
    dispatch(getAllPlanguages());
    dispatch(getPopularCourses());
  }, [dispatch, search, selectedLanguage]);

  const handleStrikeClick = () => {
    dispatch(getStrike());
  };

  const router = useRouter();

  const statistics = [
    {
      id: 1,
      title: "Started",
      value: user?.enrolledCourses || 0,
      img: "/images/rocket.png",
    },
    {
      id: 2,
      title: "Finished",
      value: user?.completedCourses || 0,
      img: "/images/finished.png",
    },
    {
      id: 3,
      title: "Streak",
      value: user?.streak || 0,
      img: "/images/fire.png",
    },
  ];

  const navigationData = [
    {
      icon: <Shield />,
      label: "Security",
      path: "/security",
    },
    {
      icon: <Web />,
      label: "Best Courses",
      path: "/best-courses",
    },
    {
      icon: <FlashOn />,
      label: "Strike",
      path: "/strike",
      onClick: handleStrikeClick,
    },
  ];

  return (
    <Grid container spacing={6} sx={{ pt: "0px !important", mt: 0 }}>
      <Grid
        item
        container
        xs={12}
        md={8}
        spacing={6}
        sx={{ pt: "0px !important" }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              width: "400px",
              height: "200px",
              backgroundColor: (theme) => `${theme.palette.background.paper}`,
              borderRadius: "300px",
              filter: "blur(100px)",
              position: "absolute",
              zIndex: 0,
              left: "20%",
              top: "0%",
            }}
          ></Box>

          <Card variant="special" sx={{ display: "inline" }}>
            <Box
              sx={{
                backgroundColor: (theme) =>
                  `${theme.palette.background.default}`,
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)",
                position: "absolute",
                left: "4px",
                top: "4px",
                zIndex: 0,
                display: "flex",
              }}
            ></Box>

            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h4"
                sx={{ justifyContent: "center", width: "100%" }}
              >
                Don't you know how to learn solana?
              </Typography>
              <Typography
                variant="h4"
                sx={{ justifyContent: "center", width: "100%", mt: 1 }}
              >
                go to the{" "}
                <Typography variant="link" color="primary">
                  roadmap
                </Typography>{" "}
                page and explore courses
              </Typography>
            </CardContent>

            <Image
              src="/images/astronout/astronout-sitting.png"
              alt="Astronout sitting"
              width={80}
              height={80}
              style={{
                position: "absolute",
                zIndex: 99,
                right: 0,
                bottom: "-1.125rem",
                width: "auto",
                height: "124px",
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3" color="warning">
            Popular Courses
          </Typography>
        </Grid>

        <Grid item container sx={12} spacing={4}>
          {courses?.popoularData?.data?.length > 0 ? (
            courses?.popoularData?.data?.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" color="text.primary">
                No popular courses available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3" color="warning">
            All Courses
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "start",
              alignItems: "center",
              textAlign: "start",
            }}
          >
            <DefaultTextField
              noControl
              variant="outlined"
              placeholder="Search for courses"
              value={search || ""}
              onChange={(e) => setSearch(e?.target?.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {planguagesSlice.data?.data?.map((planguage) => (
              <Tabs
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
                aria-label="Categories"
                type="box"
              >
                <Tab
                  label="All"
                  onClick={() => {
                    if (selectedLanguage !== "") {
                      setSelectedLanguage("");
                    }
                  }}
                />
                <Tab
                  label={planguage.name}
                  onClick={() => {
                    if (selectedLanguage !== planguage.id) {
                      setSelectedLanguage(planguage.id);
                    }
                  }}
                />
              </Tabs>
            ))}
          </Box>
        </Grid>

        <Grid item container sx={12} spacing={10}>
          {Array.isArray(courses?.data?.data) &&
            courses?.data?.data.length > 0 ? (
            courses?.data?.data.map((course) => (
              <Grid item xs={12} md={6} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" color="text.primary">
                No courses available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} md={4} sx={{ pt: "0px !important" }}>
        <Card sx={{ position: "sticky", top: "1rem" }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "start",
                    gap: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "1rem",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: (theme) =>
                        `${theme.palette.background.default}`,
                      boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
                      "& img": {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      },
                    }}
                  >
                    <img
                      src="https://picsum.photos/300"
                      alt="Astronout sitting"
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "calc(100% - 5rem - 1rem)",
                      position: "relative",
                    }}
                  >
                    <Tooltip
                      title={copy ? "Copied!" : "Click to copy"}
                      placement="top"
                      color={copy && "success"}
                      arrow
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          // fazlasına üç nokta koy
                          width: "calc(100%)",
                          webkitLineClamp: 1,
                          display: "inline-block",
                          cursor: "default",
                        }}
                        onClick={() => {
                          copyToClipboard(
                            "0xRbcFu4kY0m4n0xRbcFu4kY0m4n0xRbcFu4kY0m4n"
                          );
                        }}
                      >
                        {user?.username}
                      </Typography>
                    </Tooltip>

                    <Typography variant="caption1" color={"secondary"}>
                      {user.experience || 0} / 100 XP
                    </Typography>
                  </Box>

                  <LevelBar
                    level={user.level}
                    proggress={user.experience || 0}
                  />
                </Box>
              </Grid>

              <Grid item container xs={12} spacing={1}>
                {statistics.map((stat) => (
                  <Grid
                    item
                    xs={stat.title === "Streak" ? 12 : 6}
                    key={stat.id}
                  >
                    <Card variant="outlined" mode="dark" round="lg">
                      <CardContent size="small">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={stat.img}
                            alt={stat.title}
                            style={{
                              width: "auto",
                              height: "3rem",
                              maxWidth: "3rem",
                              objectFit: "cover",
                              marginRight: "0.5rem",
                            }}
                          />
                          <Box>
                            <Typography variant="body1" color={"secondary"}>
                              {stat.title}
                            </Typography>
                            <Typography variant="body">{stat.value}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item container xs={12} spacing={1}>
                {navigationData.map((item) => (
                  <Grid item xs={12}>
                    <ListItemButton
                      key={item.label}
                      variant="btn"
                      onClick={item.onClick}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Courses;
