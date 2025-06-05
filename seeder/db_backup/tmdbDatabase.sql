-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jun 05, 2025 at 08:31 AM
-- Server version: 9.3.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tmdbDatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text,
  `release_date` date DEFAULT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `vote_average` decimal(3,1) DEFAULT NULL,
  `content_type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `title`, `overview`, `release_date`, `poster_path`, `vote_average`, `content_type`) VALUES
(97, 'The Drew Carey Show', 'Drew is an assistant director of personnel in a Cleveland department store and he has been stuck there for ten years. Other than fighting with co-worker Mimi, his hobbies include drinking beer and not being able to get dates. To make a few extra bucks he has a micro-brewery going in his garage with his buddies.', '1995-09-13', '/cWboJ8Cfi5NgHoENAB0gYtgZHkR.jpg', 6.5, 'tv'),
(224, 'Match of the Day', 'BBC\'s football highlights and analysis.\n\n\"The longest-running football television programme in the world\" as recognised by Guinness World Records in 2015.', '1964-08-22', '/paRFRd11WlFOxVbGnzjjCBym7FW.jpg', 7.5, 'tv'),
(456, 'The Simpsons', 'Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.', '1989-12-17', '/vHqeLzYl3dEAutojCO26g0LIkom.jpg', 8.0, 'tv'),
(498, 'Late Show with David Letterman', 'Late Show with David Letterman is an American late-night talk show hosted by David Letterman on CBS. The show debuted on August 30, 1993, and is produced by Letterman\'s production company, Worldwide Pants Incorporated and CBS Television Studios. The show\'s music director and band-leader of the house band, the CBS Orchestra, is Paul Shaffer. The head writer is Matt Roberts and the announcer is Alan Kalter. Of the major U.S. late-night programs, Late Show ranks second in cumulative average viewers over time and third in number of episodes over time. The show leads other late night shows in ad revenue with $271 million in 2009.\n\nIn most U.S. markets the show airs at 11:35 p.m. Eastern/Pacific time, but is recorded Monday through Wednesday at 4:30 p.m., and Thursdays at 3:30 p.m and 6:00 p.m. The second Thursday episode usually airs on Friday of that week.\n\nIn 2002, Late Show with David Letterman was ranked No. 7 on TV Guide\'s 50 Greatest TV Shows of All Time. CBS has a contract with Worldwide Pants to continue the show through 2014; by then, Letterman will surpass Johnny Carson as the longest tenured late-night talk show host.', '1993-08-30', '/fTBC5EpsgKmli9VQcJMtqQ08Qj4.jpg', 6.3, 'tv'),
(937, 'Behind the Music', 'An intimate look into the personal lives of pop music\'s greatest and most influential artists.', '1997-08-17', '/pMnNFb6eFKF5edRh62Km2IqfdAG.jpg', 7.2, 'tv'),
(1220, 'The Graham Norton Show', 'Each week celebrity guests join Irish comedian Graham Norton to discuss what\'s being going on around the world that week. The guests poke fun and share their opinions on the main news stories. Graham is often joined by a band or artist to play the show out.', '2007-02-22', '/vrbqaBXB8AALynQzpWz6JdCPEJS.jpg', 7.2, 'tv'),
(1416, 'Grey\'s Anatomy', 'Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.', '2005-03-27', '/7jEVqXC14bhfAzSPgr896dMdDv6.jpg', 8.2, 'tv'),
(1431, 'CSI: Crime Scene Investigation', 'A Las Vegas team of forensic investigators are trained to solve criminal cases by scouring the crime scene, collecting irrefutable evidence and finding the missing pieces that solve the mystery.', '2000-10-06', '/i5hmoRjHNWady4AtAGICTUXknKH.jpg', 7.6, 'tv'),
(1434, 'Family Guy', 'Sick, twisted, politically incorrect and Freakin\' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he\'s not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.', '1999-01-31', '/8o8kiBkWFK3gVytHdyzEWUBXVfK.jpg', 7.4, 'tv'),
(1948, 'Degrassi', 'The life of a group of adolescents going through the trials and tribulations of teendom at Degrassi Community School.', '2001-10-14', '/h95kxyzzBYvibxhReNCGe8dcpsa.jpg', 7.6, 'tv'),
(2224, 'The Daily Show', 'The World\'s Fakest News Team tackle the biggest stories in news, politics and pop culture.', '1996-07-22', '/ixcfyK7it6FjRM36Te4OdblAq4X.jpg', 6.4, 'tv'),
(2225, 'Who Wants to Be a Millionaire?', 'American version of the tense gameshow where contestants tackle a series of multiple-choice questions to win large cash prizes.', '1999-08-16', '/oZ7fBwLRgKYyJcliFOfp03xv6Mk.jpg', 6.3, 'tv'),
(2261, 'The Tonight Show Starring Johnny Carson', 'The Tonight Show Starring Johnny Carson is a talk show hosted by Johnny Carson under The Tonight Show franchise from 1962 to 1992. It originally aired during late-night. For its first ten years, Carson\'s Tonight Show was based in New York City with occasional trips to Burbank, California; in May 1972, the show moved permanently to Burbank, California. In 2002, The Tonight Show Starring Johnny Carson was ranked #12 on TV Guide\'s 50 Greatest TV Shows of All Time.', '1962-10-01', '/uSvET5YUvHNDIeoCpErrbSmasFb.jpg', 7.4, 'tv'),
(2394, 'This Old House', 'TV\'s original home-improvement show, following one whole-house renovation over several episodes.', '1979-01-01', '/ecAOX4esywAXLF5I4X2gaTmhmAG.jpg', 5.4, 'tv'),
(2637, 'Come Dine with Me', 'Amateur chefs compete against each other by hosting a dinner party for the other contestants. Each competitor then rates the host\'s performance with the winner winning a £1,000 cash prize. An element of comedy is added to the show through comedian Dave Lamb, who provides a dry and \"bitingly sarcastic\" narration.', '2005-01-10', '/enFfviWZwnIKn9DhyMa7cXqKx6Q.jpg', 5.0, 'tv'),
(2734, 'Law & Order: Special Victims Unit', 'In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.', '1999-09-20', '/abWOCrIo7bbAORxcQyOFNJdnnmR.jpg', 7.9, 'tv'),
(3562, 'NOVA', 'PBS\' premier science series helps viewers of all ages explore the science behind the headlines. Along the way, NOVA demystifies science and technology, and highlights the people involved in scientific pursuits.', '1974-03-03', '/giUBXYnDAaJgNqA6iE3BMVE2EHp.jpg', 7.0, 'tv'),
(4086, 'Diners, Drive-Ins and Dives', 'Host Guy Fieri takes a cross-country road trip to visit some of America\'s classic \"greasy spoon\" restaurants — diners, drive-ins and dives — that have been doing it right for decades.', '2007-04-23', '/zeTYGOpVDI68gw47A5EmNhGDP7c.jpg', 6.7, 'tv'),
(4275, 'Prisoner', 'Prisoner is an Australian soap opera that is set in the Wentworth Detention Centre, a fictional women\'s prison.', '1979-02-27', '/9OSK44nb6ZZkMxkX6SLeQszVFke.jpg', 7.6, 'tv'),
(4419, 'Real Time with Bill Maher', 'Each week Bill Maher surrounds himself with a panel of guests which include politicians, actors, comedians, musicians and the like to discuss what\'s going on in the world.', '2003-02-21', '/pbpoLLp4kvnYVfnEGiEhagpJuVZ.jpg', 6.0, 'tv'),
(4467, 'Late Night with David Letterman', 'Late Night with David Letterman is a nightly hour-long comedy talk show on NBC that was created and hosted by David Letterman. It premiered in 1982 as the first incarnation of the Late Night franchise and went off the air in 1993, after Letterman left NBC and moved to Late Show on CBS. Late Night with Conan O\'Brien then filled the time slot. As of March 2, 2009, the slot has been filled by Late Night with Jimmy Fallon. It will be filled by Seth Meyers in the spring of 2014, after Fallon becomes host of The Tonight Show.', '1982-02-01', '/kSraSPTeNoiR60ti9amNqLvM3Em.jpg', 5.8, 'tv'),
(4601, 'Law & Order: Criminal Intent', 'The third installment of the “Law & Order” franchise takes viewers deep into the minds of its criminals while following the intense psychological approaches the Major Case Squad uses to solve its crimes.', '2001-09-30', '/zgBg8gTCELQg73awE7qAuV06c4Z.jpg', 7.6, 'tv'),
(4614, 'NCIS', 'From murder and espionage to terrorism and stolen submarines, a team of special agents investigates any crime that has a shred of evidence connected to Navy and Marine Corps personnel, regardless of rank or position.', '2003-09-23', '/mBcu8d6x6zB1el3MPNl7cZQEQ31.jpg', 7.6, 'tv'),
(4656, 'Raw', 'A regularly scheduled, live, year-round program featuring some of the biggest WWE Superstars.', '1993-01-11', '/pv5WNnLUo7mpT8k901Lo8UovrqI.jpg', 6.8, 'tv'),
(7451, 'xXx', 'Xander Cage is your standard adrenaline junkie with no fear and a lousy attitude. When the US Government \"recruits\" him to go on a mission, he\'s not exactly thrilled. His mission: to gather information on an organization that may just be planning the destruction of the world, led by the nihilistic Yorgi.', '2002-08-09', '/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg', 5.9, 'movie'),
(8590, 'Plus belle la vie', 'The daily lives of the inhabitants of \"le Mistral\", an imaginary neighbourhood in the Mediterranean port city of Marseille, where wealthy families cross paths with the less than rich.', '2004-08-30', '/jmU8HlTDn87xmRqXagcL2swDr8I.jpg', 4.4, 'tv'),
(11544, 'Lilo & Stitch', 'As Stitch, a runaway genetic experiment from a faraway planet, wreaks havoc on the Hawaiian Islands, he becomes the mischievous adopted alien \"puppy\" of an independent little girl named Lilo and learns about loyalty, friendship, and ʻohana, the Hawaiian tradition of family.', '2002-06-21', '/m13Vbzv7R2GMAl3GXFrkmMEgCFQ.jpg', 7.6, 'movie'),
(11890, 'Goede Tijden, Slechte Tijden', 'Goede tijden, slechte tijden, also known as GTST, is the longest-running Dutch soap opera,  revolving around the lives of the families Alberts, Sanders, De Jong, Van Houten and Bouwhuis. It all takes place in the fictional town of Meerdijk.', '1990-10-01', '/p1oXgtJ0q0wAcEp3tHA5DpiynxL.jpg', 5.1, 'tv'),
(12415, 'Egoli: Place of Gold', 'A South African television soap opera created by Franz Marx which revolves around the daily ups, downs, trials and tribulations of a handful of families in and around Johannesburg (which is often referred to as eGoli - the City of Gold)', '1992-04-06', '/5X0SWyNJ5IjN9YSXlbHBOVMzh1G.jpg', 6.8, 'tv'),
(13945, 'Gute Zeiten, schlechte Zeiten', 'Gute Zeiten, schlechte Zeiten is a long-running German television soap opera, first broadcast on RTL in 1992. The programme concerns the lives of a fictional neighborhood in Germany\'s capital city Berlin. Over the years the soap opera tends to have an overhaul of young people in their late teens and early twenties; targeting a young viewership.', '1992-05-11', '/qujVFLAlBnPU9mZElV4NZgL8iXT.jpg', 5.8, 'tv'),
(14424, 'Young Hearts', 'Malhação is a Brazilian television series for the teenage audience. The soap started in 1995, and was set in a fictional Gym Club called Malhação on Barra da Tijuca, Rio de Janeiro. Through the years the location varied slightly. Although the name of the soap remains the same, it is now set in the Múltipla Escolha High School.', '1995-04-24', '/bF24r2FxsjzgkJcrbBU8RC9JVoU.jpg', 6.1, 'tv'),
(14686, 'Alles was zählt', 'Alles was zählt is a German television soap opera first broadcast on RTL on September 4, 2006. The original plot revolved around Diana Sommer\'s dream to become a world class ice skater. She fell in love with Julian Herzog, who signed her at the prestigious Steinkamp Sport and Wellness Center, run by the unscrupulous Steinkamp dynasty. Diana and Julian eventually became a couple, but in November 2007, Julian suffered a brain hemorrhage and died during their wedding. Diana remained in Essen until January 2009, when she left to join a skating centre in Halle. The story continues to revolve around the Steinkamp Sport and Wellness Centre and its quest to become a sporting powerhouse, as well as the lives of the characters who work at and around the Centre.', '2006-09-04', '/zExwkyO7exxrMVrpOkDvK0BTelW.jpg', 5.0, 'tv'),
(14743, 'El Cor de la Ciutat', 'El cor de la ciutat is a TVC television soap opera first broadcast on TV3 on 11 September 2000 and last broadcast on 23 December 2009. The show is the most watched fiction program in Catalonia, Spain, especially among female audiences, drawing around 28-33% of the audience with as much as 40% during season finales. El cor de la ciutat follows the lives of the people who live and work in the neighbourhood of Sants and Sant Andreu in Barcelona, Catalonia, Spain.', '2000-09-11', '/xQ83cJA8AxoQMZe8ADApWrRZB1v.jpg', 5.3, 'tv'),
(14955, 'POV', 'Since its 1988 premiere, this critically acclaimed documentary series has presented hundreds of films that put a human face on contemporary social issues by relating a compelling story in an intimate fashion. \"POV\" has won virtually every major film and broadcasting award available, including 38 Emmys, 22 Peabody Awards and three Oscars.', '1988-07-05', '/rJStW9J8LuB6alAA8t3YdRYkhkT.jpg', 6.9, 'tv'),
(14981, 'The Late Late Show with Craig Ferguson', 'The Late Late Show with Craig Ferguson is an American late-night talk show hosted by Scottish American comedian Craig Ferguson, who is the third regular host of the Late Late Show franchise. It follows Late Show with David Letterman in the CBS late-night lineup, airing weekdays in the US at 12:37 a.m. It is taped in front of a live studio audience from Monday to Friday at CBS Television City in Los Angeles, California, directly above the Bob Barker Studio. It is produced by David Letterman\'s production company Worldwide Pants Incorporated and CBS Television Studios.\n\nSince becoming host on January 3, 2005, after Craig Kilborn and Tom Snyder, Ferguson has achieved the highest ratings since the show\'s inception in 1995. While the majority of the episodes focus on comedy, Ferguson has also addressed difficult subject matter, such as the deaths of his parents, and undertaken serious interviews, such as one with Desmond Tutu, which earned the show a 2009 Peabody Award.', '2005-01-03', '/gGC7zSDgG0FY0MbM1pjfhTCWQBI.jpg', 6.8, 'tv'),
(17380, 'The Real Housewives of Atlanta', 'Bravo\'s cameras turn to the Southern states as the network presents this inside look at the Real Housewives of Atlanta. These women handle the personal dramas that affect their affluent lifestyles with a signature Southern brand of “style” and “grace.”', '2008-10-07', '/h5HYOsyc1sJQYjqevaWEaLRjd6E.jpg', 6.0, 'tv'),
(20760, 'Lilo & Stitch 2: Stitch Has a Glitch', 'Now, we find the rowdy extraterrestrial getting used to life with his new ʻohana. However, a malfunction in the ultimate creation of Dr. Jumba soon emerges, which reinstates his destructive programming and threatens to both ruin his friendship with Lilo and to short him out for good!', '2005-08-22', '/p2R4mhZcikWEBlqv80VfJ7M9xql.jpg', 6.7, 'movie'),
(22980, 'Watch What Happens Live with Andy Cohen', 'Bravo network executive Andy Cohen discusses pop culture topics with celebrities and reality show personalities.', '2009-07-16', '/onSD9UXfJwrMXWhq7UY7hGF2S1h.jpg', 5.1, 'tv'),
(30957, 'The Amazing Race', 'This reality competition sees teams embark on a trek around the world to amazing destinations where they must compete in a series of challenges, some mental and some physical. Only when the tasks are completed will they learn of their next location. Teams who are the farthest behind will gradually be eliminated as the contest progresses, with the first team to arrive at the final destination winning the race and the $1 million prize.', '2001-09-05', '/x1jq0atcQg6UkaZpco0kFL6QHuM.jpg', 6.9, 'tv'),
(32390, 'The Real Housewives of Beverly Hills', 'A reality series that follows some of the most affluent women in the country as they enjoy the lavish lifestyle that only Beverly Hills can provide.', '2010-10-14', '/gHZmEmtQzobW9PVdpGrYP7SU9RH.jpg', 6.3, 'tv'),
(34860, 'Ninja Boy Rantaro', 'Rantarō, Shinbei and Kirimaru are ninja  apprentices in the Ninja Gakuen, where first grade ones are called  \"Nintamas\". They must learn  everything a ninja must know, but as for our heroes, money, food or  playing are more interesting. The series show the everyday adventures of  our heroes.', '1993-04-10', '/raKlXyICQBeTxYavErIRybR6g8d.jpg', 6.4, 'tv'),
(40605, 'Die Harald Schmidt Show', 'The Harald Schmidt Show is a German late night talk show hosted on Sky Deutschland by comedian Harald Schmidt. The show first aired from 5 December 1995 to 23 December 2003 on Sat.1. Schmidt then moved his show to Das Erste as Harald Schmidt and Schmidt & Pocher, but he returned to Sat.1 on 13 September 2011. After cancellation on Sat.1, the show continued on Sky Deutschland in September 2012.', '1995-12-05', '/lQcE1AzjDP5zJRUW76PMRn7ai9W.jpg', 7.0, 'tv'),
(45789, 'Sturm der Liebe', 'These are the stories of relationships taking place in the fictional five-star hotel Fürstenhof, located in Feldkirchen-Westerham near Rosenheim with the plot revolving around members of the family room area, the hotel owners, and employees.', '2005-09-26', '/jfFNydakwvbeACEwSd2Gh8UWtba.jpg', 6.1, 'tv'),
(46825, 'Rooster Teeth Animated Adventures', 'The animated shenanigans of the Rooster Teeth staff. Audio taken from the Rooster Teeth Podcast.', '2011-09-28', '/xrcOsjmuBcmf1YhqyQ6qrGCcsvE.jpg', 8.6, 'tv'),
(50821, 'Among Friends', 'Miklós introduces viewers into the world of Money and Charm.', '1998-10-26', '/kBBbSgNchtMvsgD6z1oI1RRluHP.jpg', 3.2, 'tv'),
(55216, 'Scènes de ménages', '', '2009-11-09', '/38N3KQblPyTLGWNZs2qmy9mQywm.jpg', 6.2, 'tv'),
(59941, 'The Tonight Show Starring Jimmy Fallon', 'After Jay Leno\'s second retirement from the program, Jimmy Fallon stepped in as his permanent replacement. After 42 years in Los Angeles the program was brought back to New York.', '2014-02-17', '/g4amxJvtpnY79J77xeamnAEUO8r.jpg', 5.8, 'tv'),
(60694, 'Last Week Tonight with John Oliver', 'A half-hour satirical look at the week in news, politics and current events.', '2014-04-27', '/b12eM3FXNjN7yM7XYTIdmeQRud9.jpg', 7.9, 'tv'),
(61818, 'Late Night with Seth Meyers', 'Seth Meyers, who is \"Saturday Night Live’s\" longest serving anchor on the show’s wildly popular \"Weekend Update,\" takes over as host of NBC’s \"Late Night\" — home to A-list celebrity guests, memorable comedy and the best in musical talent. As the Emmy Award-winning head writer for \"SNL,\" Meyers has established a reputation for sharp wit and perfectly timed comedy, and has gained fame for his spot-on jokes and satire. Meyers takes his departure from \"SNL\" to his new post at \"Late Night,\" as Jimmy Fallon moves to \"The Tonight Show\".', '2014-02-25', '/rw0QaegwgKbRoB2CZe2lfewltT9.jpg', 5.3, 'tv'),
(62223, 'The Late Late Show with James Corden', 'Once Craig Ferguson retires, James Corden will be taking over The Late Late Show. The show is a late night talk show that interviews celebrities and has its own bits. And of course, it\'s all hosted by James Corden.', '2015-03-23', '/qPmVoG8G9tc1nN8ZwGV2zYcknit.jpg', 5.3, 'tv'),
(63770, 'The Late Show with Stephen Colbert', 'Stephen Colbert brings his signature satire and comedy to The Late Show with Stephen Colbert, the #1 show in late night, where he talks with an eclectic mix of guests about what is new and relevant in the worlds of politics, entertainment, business, music, technology, and more. Featuring bandleader Jon Batiste with his band Stay Human, the Emmy Award-nominated show is broadcast from the historic Ed Sullivan Theater. Stephen Colbert, Chris Licht, Tom Purcell, and Jon Stewart are executive producers. Barry Julien and Denise Rehrig serve as co-executive producers.must watch', '2015-09-08', '/9jkThAGYj2yp8jsS6Nriy5mzKFT.jpg', 6.3, 'tv'),
(64190, 'Volle Kanne', '', '1999-08-30', NULL, 4.4, 'tv'),
(66046, 'Mystery Music Show: King of Mask Singer', 'Competitors are given elaborate masks to wear in order to conceal their identity, thus removing factors such as popularity, career and age that could lead to prejudiced voting. In the first round, a pair of competitors sing the same song, while in the second and third rounds they each sing a solo song. After the First Generation, the winner of the Third Round goes on to challenge the Mask King, and is either eliminated or replaces the previous Mask King through live voting. The identities of the singers are not revealed unless they have been eliminated.', '2015-04-05', '/vlnAfmirzYx1TSxXuaPhHjkPPmK.jpg', 5.7, 'tv'),
(66465, 'The Kapil Sharma Show', '', '2016-04-23', '/fBPNBNFmcwhYXUpkW2Kb6jbeJOR.jpg', 7.1, 'tv'),
(72649, 'Hot Ones', 'The show with hot questions and even hotter wings invites a famous guest over to eat and then interviews them while they\'re struggling through the heat.', '2015-03-12', '/4uudasFgKCVQFNGqfanD6wEGVS1.jpg', 7.4, 'tv'),
(79744, 'The Rookie', 'Starting over isn\'t easy, especially for small-town guy John Nolan who, after a life-altering incident, is pursuing his dream of being an LAPD officer. As the force\'s oldest rookie, he’s met with skepticism from some higher-ups who see him as just a walking midlife crisis.', '2018-10-16', '/bL1mwXDnH5fCxqc4S2n40hoVyoe.jpg', 8.5, 'tv'),
(80715, 'Firing Line with Margaret Hoover', 'Join author, activist and commentator Margaret Hoover for a public affairs talk show that delivers a civil and engaging contest of ideas among the brightest minds and voices from across the ideological spectrum.', '2018-06-22', '/srOUdl0RyPKGTq8XRY9HU2tDdzH.jpg', 7.5, 'tv'),
(94722, 'Tagesschau', 'German daily news program, the oldest still existing program on German television.', '1952-12-26', '/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg', 6.8, 'tv'),
(100088, 'The Last of Us', 'Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.', '2023-01-15', '/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg', 8.5, 'tv'),
(204746, 'The Jennifer Hudson Show', 'Talented entertainer and newly-minted EGOT Jennifer Hudson takes on the daytime talk show landscape.', '2022-09-12', '/6VBNeo8XG90sNKWYQ0yTEmVBXHJ.jpg', 6.4, 'tv'),
(206559, 'Binnelanders', 'A South African Afrikaans soap opera. It is set in and around the fictional private hospital, Binneland Kliniek, in Pretoria, and the storyline follows the trials, trauma and tribulations of the staff and patients of the hospital.', '2005-10-13', '/3bzECfllho8PphdYujLUIuhncJD.jpg', 5.6, 'tv'),
(215803, 'Batang Quiapo', 'A young man rises to be one of the biggest outlaws in the neighborhood while he navigates his way in life to survive in Quiapo. Hoping to earn the affection of his parents, his feat draws him closer to the truth about his identity.', '2023-02-13', '/9McqS8mgMf5NJCAKZIY6J1oOl8y.jpg', 6.9, 'tv'),
(236443, 'Getroud met Rugby: Die Sepie', 'Getroud met Rugby: Die Sepie is a South African soap opera based on the feature film and later drama series Getroud met Rugby by Deon Opperman, which is set amongst a rugby-playing community.', '2016-04-04', '/sBp8JBN38AanXyuX4yT3SDuoieY.jpg', 3.0, 'tv'),
(299536, 'Avengers: Infinity War', 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.', '2018-04-25', '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', 8.2, 'movie'),
(315635, 'Spider-Man: Homecoming', 'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.', '2017-07-05', '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 7.3, 'movie'),
(324544, 'In the Lost Lands', 'A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.', '2025-02-27', '/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg', 6.3, 'movie'),
(436969, 'The Suicide Squad', 'Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.', '2021-07-28', '/q61qEyssk2ku3okWICKArlAdhBn.jpg', 7.5, 'movie'),
(447273, 'Snow White', 'Following the benevolent King\'s disappearance, the Evil Queen dominated the once fair land with a cruel streak. Princess Snow White flees the castle when the Queen, in her jealousy over Snow White\'s inner beauty, tries to kill her. Deep into the dark woods, she stumbles upon seven magical dwarves and a young bandit named Jonathan. Together, they strive to survive the Queen\'s relentless pursuit and aspire to take back the kingdom.', '2025-03-12', '/oLxWocqheC8XbXbxqJ3x422j9PW.jpg', 4.3, 'movie'),
(497698, 'Black Widow', 'Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.', '2021-07-07', '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg', 7.2, 'movie'),
(541671, 'Ballerina', 'Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.', '2025-06-04', '/mKp4euM5Cv3m2U1Vmby3OGwcD5y.jpg', 7.4, 'movie'),
(552524, 'Lilo & Stitch', 'The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.', '2025-05-17', '/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg', 7.1, 'movie'),
(568770, 'The Containment', 'A girl is possessed by a dark and mysterious entity. She will fight with all the elements at her disposal to get rid of it. Neither her mother, nor traditional medicine, nor a supposed expert in exorcisms, will be able to make the demon disappear, until a nun gets involved in the case and sows a doubt more terrible than the possession itself.', '2025-06-05', '/nHNwBOccmQ7rK9yQI1HUSnHm1Ny.jpg', 7.7, 'movie'),
(574475, 'Final Destination Bloodlines', 'Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.', '2025-05-14', '/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg', 7.0, 'movie'),
(575264, 'Mission: Impossible - Dead Reckoning Part One', 'Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world\'s fate at stake and dark forces from Ethan\'s past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.', '2023-07-08', '/NNxYkU70HPurnNCSiCjYAmacwm.jpg', 7.5, 'movie'),
(575265, 'Mission: Impossible - The Final Reckoning', 'Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world\'s governments and a mysterious ghost from Hunt\'s past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.', '2025-05-17', '/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg', 7.1, 'movie'),
(668489, 'Havoc', 'When a drug heist swerves lethally out of control, a jaded cop fights his way through a corrupt city\'s criminal underworld to save a politician\'s son.', '2025-04-25', '/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg', 6.5, 'movie'),
(676685, 'Panda Bear in Africa', 'A young adventurous panda travels from China to Africa to rescue his best friend, Jielong the Dragon, who has been kidnapped. On his journey, he discovers a strange amazing new world of mountains, deserts and jungles.', '2024-03-15', '/wxpu7svVqA0ALYpofQBPujGelN3.jpg', 6.3, 'movie'),
(710258, 'Rust', 'Infamous outlaw Harland Rust breaks his estranged grandson Lucas out of prison, after Lucas is convicted to hang for an accidental murder. The two must outrun legendary U.S Marshal Wood Helm and bounty hunter Fenton \"Preacher\" Lang who are hot on their tails. Deeply buried secrets rise from the ashes and an unexpected familial bond begins to form as the mismatched duo tries to survive the merciless American Frontier.', '2025-05-01', '/tbJ3RkA2s6X5qrBzrYHYTxvDBui.jpg', 6.4, 'movie'),
(715287, 'Stepmom\'s Desire', 'Sang-jin, who was envious of her neighbor after getting a beautiful wife, Ask your wife\'s friend Gian to take over the son\'s extracurricular teacher, Sang-jin, who left work early, accidentally sees Gian\'s shower. A man who wants to have sex with his son\'s tutor, And a son who wants to have a good time with a young stepmom, Ji-an and Jin-hee, who want money, are disappointed with her husband, and Bin-jin gives her body to a young son.', '2020-05-29', '/rYC6UyML4CU4zYiZVbDMrwnGyWW.jpg', 7.0, 'movie'),
(757725, 'Shadow Force', 'Kyrah and Isaac were once the leaders of a multinational special forces group called Shadow Force. They broke the rules by falling in love, and in order to protect their son, they go underground. With a large bounty on their heads, and the vengeful Shadow Force hot on their trail, one family\'s fight becomes all-out war.', '2025-05-01', '/uX6FaNE86a4Xnf1mFFEryvjqB1D.jpg', 6.2, 'movie'),
(762509, 'Mufasa: The Lion King', 'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.', '2024-12-18', '/lurEK87kukWNaHd0zYnsi3yzJrs.jpg', 7.4, 'movie'),
(822119, 'Captain America: Brave New World', 'After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.', '2025-02-12', '/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', 6.1, 'movie'),
(896536, 'The Legend of Ochi', 'In a remote village on the island of Carpathia, a shy farm girl named Yuri is raised to fear an elusive animal species known as ochi. But when Yuri discovers a wounded baby ochi has been left behind, she escapes on a quest to bring him home.', '2025-04-18', '/wVujUVvY4qvKARAslItQ4ARKqtz.jpg', 6.3, 'movie'),
(897160, 'Brave Citizen', 'An expelled boxing champion, who now is a high-school teacher, witnesses intolerable violence and throws her first punch to build justice against it, while putting on a mask.', '2023-10-25', '/zR9j2auEEQIaBbi7uTIFtDChmmA.jpg', 6.8, 'movie'),
(939243, 'Sonic the Hedgehog 3', 'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.', '2024-12-19', '/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg', 7.7, 'movie'),
(950387, 'A Minecraft Movie', 'Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they\'ll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.', '2025-03-31', '/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg', 6.5, 'movie'),
(968171, 'Sex Education Mistresses', 'An erotic comedy depicting the sex adventures of  young wives living in an apartment complex, that are not satisfied with just having sex with their husbands.', '1973-11-20', '/xghWMg0pkBOdLHCTESyeyHU68wl.jpg', 5.9, 'movie'),
(977294, 'Tin Soldier', 'An ex-special forces operative seeks revenge against a cult leader who has corrupted his former comrades, the Shinjas. This leader, known as The Bokushi, promises veterans a purpose and protection, but is revealed to be a destructive influence. The ex-soldier, Nash Cavanaugh, joins forces with military operative Emmanuel Ashburn to infiltrate the Bokushi\'s fortress and expose his reign of terror', '2025-05-22', '/6HU667T8fxoIvgsgu2eyaznntsp.jpg', 5.0, 'movie'),
(986056, 'Thunderbolts*', 'After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.', '2025-04-30', '/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg', 7.4, 'movie'),
(1001414, 'Fear Street: Prom Queen', 'Who will be voted queen at Shadyside High\'s 1988 prom? For underdog Lori, competition is cutthroat even before someone starts killing off the candidates.', '2025-05-23', '/gevScWYkF8l5i9NjFSXo8HfPNyy.jpg', 5.4, 'movie'),
(1010581, 'My Fault', 'Noah must leave her city, boyfriend, and friends to move into William Leister\'s mansion, the flashy and wealthy husband of her mother Rafaela. As a proud and independent 17 year old, Noah resists living in a mansion surrounded by luxury. However, it is there where she meets Nick, her new stepbrother, and the clash of their strong personalities becomes evident from the very beginning.', '2023-06-08', '/w46Vw536HwNnEzOa7J24YH9DPRS.jpg', 7.8, 'movie'),
(1011477, 'Karate Kid: Legends', 'After a family tragedy, kung fu prodigy Li Fong is uprooted from his home in Beijing and forced to move to New York City with his mother. When a new friend needs his help, Li enters a karate competition – but his skills alone aren\'t enough. Li\'s kung fu teacher Mr. Han enlists original Karate Kid Daniel LaRusso for help, and Li learns a new way to fight, merging their two styles into one for the ultimate martial arts showdown.', '2025-05-08', '/c90Lt7OQGsOmhv6x4JoFdoHzw5l.jpg', 7.2, 'movie'),
(1040159, 'My Massive Cock', 'An extra-large penis is an object of desire for many. But for some men, extra-large seriously complicates their lives and relationships, and penis reduction surgery seems the only answer.', '2022-10-24', '/9JQHViS8uugeWKfFsnEj3xTB2dZ.jpg', 5.8, 'movie'),
(1064213, 'Anora', 'A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.', '2024-10-14', '/7MrgIUeq0DD2iF7GR6wqJfYZNeC.jpg', 7.1, 'movie'),
(1087192, 'How to Train Your Dragon', 'On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.', '2025-06-06', '/3lwlJL8aW6Wor9tKvME8VoMnBkn.jpg', 7.3, 'movie'),
(1094473, 'Bambi: A Life in the Woods', 'The life of Bambi, a male roe deer, from his birth through childhood, the loss of his mother, the finding of a mate, the lessons he learns from his father, and the experience he gains about the dangers posed by human hunters in the forest.', '2024-10-16', '/vWNVHtwOhcoOEUSrY1iHRGbgH8O.jpg', 6.0, 'movie'),
(1098006, 'Fountain of Youth', 'A treasure-hunting mastermind assembles a team for a life-changing adventure. But to outwit and outrun threats at every turn, he\'ll need someone even smarter than he is: his estranged sister.', '2025-05-19', '/4iWjGghUj2uyHo2Hyw8NFBvsNGm.jpg', 6.5, 'movie'),
(1144430, 'Last Bullet', 'Car genius Lino returns to conclude his vendetta against Areski and the corrupt commander who ruined their lives in this turbo-charged trilogy finale.', '2025-05-06', '/qycPITRqXgPai7zj1gKffjCdSB5.jpg', 6.7, 'movie'),
(1165642, 'Lost in Starlight', 'When an astronaut leaves Earth for Mars, the vast infinite space divides star-crossed lovers in this animated romance that crosses the cosmos.', '2025-05-30', '/dXlUIfwejWa9YvugU9V773dUASY.jpg', 7.7, 'movie'),
(1195506, 'Novocaine', 'When the girl of his dreams is kidnapped, everyman Nate turns his inability to feel pain into an unexpected strength in his fight to get her back.', '2025-03-12', '/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg', 6.9, 'movie'),
(1197306, 'A Working Man', 'Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss\'s daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.', '2025-03-26', '/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg', 6.7, 'movie'),
(1199974, 'Párvulos: Children of the Apocalypse', 'In a dystopian future ravaged by a viral apocalypse, three young brothers—Salvador, Oliver, and Benjamin—find themselves isolated in a remote cabin deep within the woods. As they navigate this desolate world, they harbor a dark and disturbing secret in their basement, a presence they must feed to ensure their own survival.', '2024-10-18', '/pHehmoG3gbTb5RsKWOdxqLmnhpD.jpg', 6.5, 'movie'),
(1225915, 'Jewel Thief - The Heist Begins', 'In this high-octane battle of wits and wills, ingenious con artist Rehan devises a diamond heist while trying to outsmart Rajan, his sadistic adversary.', '2025-04-24', '/eujLbO0kf1eqWC8XpHUJdtAVW2J.jpg', 6.8, 'movie'),
(1232546, 'Until Dawn', 'One year after her sister Melanie mysteriously disappeared, Clover and her friends head into the remote valley where she vanished in search of answers. Exploring an abandoned visitor center, they find themselves stalked by a masked killer and horrifically murdered one by one...only to wake up and find themselves back at the beginning of the same evening.', '2025-04-23', '/juA4IWO52Fecx8lhAsxmDgy3M3.jpg', 6.5, 'movie'),
(1232933, 'Fear Below', 'A rag-tag team of divers attempting to salvage a sunken car from a river are thwarted by a highly aggressive bull shark.', '2025-05-02', '/24uJJJSRYwxHfNAqVCUmqjtmXgz.jpg', 6.4, 'movie'),
(1233069, 'Exterritorial', 'When her son vanishes inside a US consulate, ex-special forces soldier Sara does everything in her power to find him — and uncovers a dark conspiracy.', '2025-04-29', '/jM2uqCZNKbiyStyzXOERpMqAbdx.jpg', 6.8, 'movie'),
(1233413, 'Sinners', 'Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.', '2025-04-16', '/yqsCU5XOP2mkbFamzAqbqntmfav.jpg', 7.5, 'movie'),
(1241436, 'Warfare', 'A platoon of Navy SEALs embarks on a dangerous mission in Ramadi, Iraq, with the chaos and brotherhood of war retold through their memories of the event.', '2025-04-09', '/srj9rYrjefyWqkLc6l2xjTGeBGO.jpg', 7.3, 'movie'),
(1241894, 'Woodwalkers', 'Humans who can shapeshift into animals struggle to integrate with others without giving away their special abilities. As a group, they strive to inform and institute change in the world perspective of deforestation and the importance of natural habitats. However, when that can’t happen, they are forced to take matters into their own hands.', '2024-10-17', '/bC1r04ohuxv5feaGDzQ0lXz7Bbl.jpg', 6.1, 'movie'),
(1241982, 'Moana 2', 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.', '2024-11-21', '/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg', 7.1, 'movie'),
(1245165, 'Graduation Trip: Mallorca', '2021. After spending a year in confinement, a group of high school students and their two teachers begin an end-of-year trip to Mallorca. This great plan is the last opportunity they have to all be together, make up for lost time, be able to have fun like they have never had before and say goodbye to this crazy stage of their lives. However, a new coronavirus outbreak disrupts all their plans and forces them to stay locked in their hotel rooms. More than 50 students, 2 teachers, a hotel and many, many minibars... What could go wrong?', '2025-05-30', '/ejYX4ygRoupGRjFgmmtnK0sMxhN.jpg', 5.5, 'movie'),
(1257960, 'Sikandar', 'A tragic accident pushes the powerful Sikandar to protect the less fortunate by standing up to corruption and greed — using any means necessary.', '2025-03-29', '/t48miSSfe7COqgbgMyRIyPVTBoM.jpg', 5.2, 'movie'),
(1284120, 'The Ugly Stepsister', 'In a fairy-tale kingdom where beauty is a brutal business, Elvira battles to compete with her incredibly beautiful stepsister, and she will go to any length to catch the prince’s eye.', '2025-03-07', '/crX9rSg9EohybhkEe8iTQUCe55y.jpg', 7.0, 'movie'),
(1297028, 'Rosario', 'Wall Street stockbroker Rosario Fuentes returns to her grandmother\'s apartment after her sudden death. While sorting through her belongings, Rosario discovers a hidden chamber that\'s filled with occult artifacts tied to dark generational rituals. As supernatural occurrences begin to plague her, she must confront her family\'s buried secrets and face the truth about the sacrifices and choices they made.', '2025-05-01', '/beLZhuHT97849WkWgty2X1hkWUa.jpg', 5.2, 'movie'),
(1397832, 'A Widow\'s Game', 'When a man is found dead, the investigation shatters his widow\'s perfect facade and exposes a hidden double life in this thriller based on real events.', '2025-05-29', '/yZOdrJDl2GwREoigC0y40kMosxj.jpg', 6.4, 'movie'),
(1403735, 'Laila', 'Sonu Model, a renowned beautician from the old city, is forced to disguise himself as Laila, leading to a series of comedic, romantic, and action-packed events. Chaos ensues in this hilarious laugh riot', '2025-02-14', '/l4gsNxFPGpzbq0D6QK1a8vO1lBz.jpg', 5.0, 'movie'),
(1411773, 'The Last Stand of Ellen Cole', 'When an evil contractor goes to extreme measures to evict a testy tenant who is standing in the way of his new project, he fails to take into account that this seemingly harmless old woman is a trained killer and will do anything to protect her beloved home.', '2024-10-18', '/oq1pGVQ2t3Cy4v7sA4LRhNjtZuJ.jpg', 8.2, 'movie'),
(1417059, 'Mountainhead', 'A group of billionaire friends get together against the backdrop of a rolling international crisis.', '2025-05-22', '/jZKK5mFKWbquxhAGMkRJtNYwk0I.jpg', 5.6, 'movie'),
(1448938, 'Abduct', 'A woman\'s peaceful mountain getaway takes a bizarre turn when her boyfriend disappears, and a random naked man shows up claiming to be him.', '2025-04-02', '/ls2JG1vDzmeHmiDHUt1eKwRVKTL.jpg', 5.2, 'movie'),
(1480799, 'The Great Escape', '', '2023-05-26', '/h7shL668vhC2wsZQSBWzxkMuZ8K.jpg', 5.7, 'movie');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` bigint NOT NULL,
  `content_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`user_id`, `content_id`) VALUES
(1, 2637),
(1, 14955),
(1, 1241436),
(2, 8590),
(2, 64190),
(2, 575265),
(3, 715287),
(3, 897160),
(3, 1417059),
(4, 32390),
(4, 668489),
(4, 1241982),
(5, 66046),
(5, 977294),
(5, 1010581);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '$2b$12$GOGctuA3/UfEmOQvQ2F5kOnP1HHdverBHYKztUO1WeWXhVFRXcjsS'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '$2b$12$DH0dWirEHeMWoL2jmXJj9.zUNSwP1nUi.VACFSa6TXdTtTKJVMfzG'),
(3, 'Michael', 'Johnson', 'michael.j@example.com', '$2b$12$4Yb.PB1D3UMrw2K5j5XBRecDiNLlvsOkIoD05zScYlc85EijdCVbO'),
(4, 'Emily', 'Williams', 'emily.w@example.com', '$2b$12$alW.F3HrfkRRnz.7hP/5o.1Gk5bmGlYNR7TGqDK3yhgbp0bIg9sq.'),
(5, 'David', 'Brown', 'david.brown@example.com', '$2b$12$2VGmM6G8pyTy4e3HKfnK/upseKC2LU.92UOx7kE3h1peY7v.kuK76');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`content_id`),
  ADD KEY `IDX_35a6b05ee3b624d0de01ee5059` (`user_id`),
  ADD KEY `IDX_de47264f0da3ed9b5185f53d67` (`content_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK_35a6b05ee3b624d0de01ee50593` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_de47264f0da3ed9b5185f53d67f` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
