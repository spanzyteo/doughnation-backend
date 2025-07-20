--
-- PostgreSQL database dump
--

-- Dumped from database version 13.21
-- Dumped by pg_dump version 13.21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    icon text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    days integer NOT NULL,
    title text NOT NULL,
    "fundsToRaise" integer NOT NULL,
    "fundsRaised" integer NOT NULL,
    image text NOT NULL,
    backers integer NOT NULL,
    "categoryId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    name text NOT NULL,
    review text NOT NULL,
    image text DEFAULT 'https://avatar.iran.liara.run/public/8'::text NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, icon) FROM stdin;
34d88451-9a2c-409e-a7b5-7f87949e428c	Technology	RiSettings4Line
5fec3a23-4ed4-4194-8acc-ff76334c7f99	Videos	MdOutlineVideoSettings
1f78bc3b-0284-4fcc-8b58-727a4c1ff885	Education	PiBookOpenText
2ce754dd-5826-4e76-9d8c-f4d765a0ea0f	Medical	PiStethoscopeBold
4bbc3426-811e-437c-90dd-9f2142fed334	Fashion	GiClothes
ed5cf938-db23-4068-bc8a-8eede8bd1024	Design	CgIfDesign
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, days, title, "fundsToRaise", "fundsRaised", image, backers, "categoryId", "userId") FROM stdin;
a7d60b9c-76ed-4e68-80d4-a27a29457353	110	VR Ears | Hear off-World Listen Off Ear	2000000	400000	https://res.cloudinary.com/dbzrltno7/image/upload/v1752760814/doughnation/tmp-1-29231752760810594_s2wjhw.jpg	5	34d88451-9a2c-409e-a7b5-7f87949e428c	d322d817-3409-4f9f-af9a-13ac60ce822b
c80e9e68-88d1-4406-8caa-612b38cff163	104	Notebook for your creative observation	1000000	200000	https://res.cloudinary.com/dbzrltno7/image/upload/v1752761029/doughnation/tmp-2-29231752761027326_qrshok.jpg	3	ed5cf938-db23-4068-bc8a-8eede8bd1024	d322d817-3409-4f9f-af9a-13ac60ce822b
9a4e705c-37f5-47cb-b7ea-235ae90997e0	90	Smart Reach Audio Software	4000000	700000	https://res.cloudinary.com/dbzrltno7/image/upload/v1752761189/doughnation/tmp-3-29231752761187045_xmtkhi.jpg	6	4bbc3426-811e-437c-90dd-9f2142fed334	d322d817-3409-4f9f-af9a-13ac60ce822b
58608a15-2d31-43c5-9ddc-898f5a7af29d	209	British Wildlife Illustrated Gift Wrap	6000000	300000	https://res.cloudinary.com/dbzrltno7/image/upload/v1752761326/doughnation/tmp-4-29231752761324135_zb3gxx.jpg	7	5fec3a23-4ed4-4194-8acc-ff76334c7f99	d322d817-3409-4f9f-af9a-13ac60ce822b
2f0beb6c-786b-4f01-b3f7-901ec61d9d70	1184	Mirror one | Your life at a glance	80000000	5300000	https://res.cloudinary.com/dbzrltno7/image/upload/v1752761683/doughnation/tmp-6-29231752761681176_ik9cde.jpg	23	34d88451-9a2c-409e-a7b5-7f87949e428c	d322d817-3409-4f9f-af9a-13ac60ce822b
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, name, review, image) FROM stdin;
0afc728f-66b6-4c8e-97b7-e0bbc6126cb9	Christine Eve	There are many variations of available, but the majority have sufferd in some form by injected or randomised words which don't look even believable. If you are to lorem ipsum is simply going to use a passage.	https://res.cloudinary.com/dbzrltno7/image/upload/v1752762487/doughnation/tmp-7-29231752762483343_fnbvaa.jpg
f27d36ae-c3ac-4ee8-83c7-abd9fc222621	Bobby James	I was initially skeptical, but everything turned out great. The customer support was top-notch and very responsive.	https://res.cloudinary.com/dbzrltno7/image/upload/v1752762739/doughnation/tmp-8-29231752762732502_afrjk4.jpg
de7184a4-2ed6-4947-a77f-09bd47bb613f	Steven John	Great attention to detail and fantastic execution. One of the best services I've used in a while. Will definitely come back.	https://res.cloudinary.com/dbzrltno7/image/upload/v1752762824/doughnation/tmp-9-29231752762819951_pmilmr.jpg
1a009736-b6e0-43d1-9c9b-60bd7ff2199e	Kingsley Nathan	Smooth process from start to finish. The team listened to my needs and delivered beyond what I expected.	https://res.cloudinary.com/dbzrltno7/image/upload/v1752762896/doughnation/tmp-10-29231752762889533_nvmxtg.jpg
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
d322d817-3409-4f9f-af9a-13ac60ce822b	Theo	theo@gmail.com	$2b$10$Z8I2GgA.eIpgfUn4mVrGkO4NZBmRaoBWhK4Ehm13B.eIu7prhDjCq	2025-07-16 19:37:16.989	2025-07-16 19:37:16.989
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
02ec0668-78a1-4982-88e1-3c42019d45c0	c15d7d19a0361f4eb20dcb3b931c35bb48213da3db5ea92485fac4038880ae22	2025-07-14 12:26:50.926459+00	20250713233614_init	\N	\N	2025-07-14 12:26:50.855462+00	1
5892d381-416a-4eca-baf7-b6e74c584e83	c843959bdd23bea41ae8b7fdc93c05b70048bff6b15effb6ab378e94d68a4006	2025-07-14 12:26:50.937869+00	20250714111847_make_image_optional	\N	\N	2025-07-14 12:26:50.928773+00	1
caf7eb76-806a-4c31-b069-7c3bc544cd65	f0954ca58f7d920881fcd0c1e57dedf14586adc02417a337639e93f2e8bdc24c	2025-07-14 12:27:37.580655+00	20250714122737_add_default_image	\N	\N	2025-07-14 12:27:37.559419+00	1
012f578e-b200-4599-84df-cf1dcdacc820	4fd0a0d1cc353973473b7a3ebfa730c14b40a75765a73a3399f7ee48f4c098bf	2025-07-16 16:48:51.060668+00	20250716164850_add_user_to_project	\N	\N	2025-07-16 16:48:50.956305+00	1
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Project Project_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Project Project_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

