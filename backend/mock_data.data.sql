--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.3

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
-- Name: app_echouser; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.app_echouser (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(10) NOT NULL
);


ALTER TABLE public.app_echouser OWNER TO echo_user;

--
-- Name: app_echouser_groups; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.app_echouser_groups (
    id bigint NOT NULL,
    echouser_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.app_echouser_groups OWNER TO echo_user;

--
-- Name: app_echouser_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.app_echouser_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_echouser_groups_id_seq OWNER TO echo_user;

--
-- Name: app_echouser_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.app_echouser_groups_id_seq OWNED BY public.app_echouser_groups.id;


--
-- Name: app_echouser_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.app_echouser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_echouser_id_seq OWNER TO echo_user;

--
-- Name: app_echouser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.app_echouser_id_seq OWNED BY public.app_echouser.id;


--
-- Name: app_echouser_user_permissions; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.app_echouser_user_permissions (
    id bigint NOT NULL,
    echouser_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.app_echouser_user_permissions OWNER TO echo_user;

--
-- Name: app_echouser_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.app_echouser_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_echouser_user_permissions_id_seq OWNER TO echo_user;

--
-- Name: app_echouser_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.app_echouser_user_permissions_id_seq OWNED BY public.app_echouser_user_permissions.id;


--
-- Name: app_savedqueries; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.app_savedqueries (
    id bigint NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    content text NOT NULL,
    name character varying(100) NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.app_savedqueries OWNER TO echo_user;

--
-- Name: app_savedqueries_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.app_savedqueries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_savedqueries_id_seq OWNER TO echo_user;

--
-- Name: app_savedqueries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.app_savedqueries_id_seq OWNED BY public.app_savedqueries.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO echo_user;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO echo_user;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO echo_user;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO echo_user;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO echo_user;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO echo_user;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO echo_user;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO echo_user;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO echo_user;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO echo_user;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO echo_user;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: echo_user
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO echo_user;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: echo_user
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: echo_user
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO echo_user;

--
-- Name: app_echouser id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser ALTER COLUMN id SET DEFAULT nextval('public.app_echouser_id_seq'::regclass);


--
-- Name: app_echouser_groups id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_groups ALTER COLUMN id SET DEFAULT nextval('public.app_echouser_groups_id_seq'::regclass);


--
-- Name: app_echouser_user_permissions id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.app_echouser_user_permissions_id_seq'::regclass);


--
-- Name: app_savedqueries id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_savedqueries ALTER COLUMN id SET DEFAULT nextval('public.app_savedqueries_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: app_echouser; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.app_echouser (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, created, modified, email, role) FROM stdin;
1	pbkdf2_sha256$260000$fk3T3epChDUvtLoxO61XXL$jWqXN7qfaiH4swXbNo+6Vf83XvUqXsbYFLkfUucX6vs=	2021-10-15 17:43:16.372637+00	f	Gia	Robinson	f	t	2021-10-15 17:41:51.487813+00	2021-10-15 17:41:51.488031+00	2021-10-15 17:41:51.488054+00	gia@site.com	editor
2	pbkdf2_sha256$260000$fk3T3epChDUvtLoxO61XXL$jWqXN7qfaiH4swXbNo+6Vf83XvUqXsbYFLkfUucX6vs=	2021-10-15 18:59:17.713487+00	f	Myo	Khin	f	t	2021-10-15 17:41:51.493908+00	2021-10-15 17:41:51.494093+00	2021-10-15 17:41:51.494115+00	myo@site.com	guest
\.


--
-- Data for Name: app_echouser_groups; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.app_echouser_groups (id, echouser_id, group_id) FROM stdin;
\.


--
-- Data for Name: app_echouser_user_permissions; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.app_echouser_user_permissions (id, echouser_id, permission_id) FROM stdin;
\.


--
-- Data for Name: app_savedqueries; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.app_savedqueries (id, created, modified, content, name, user_id) FROM stdin;
1	2021-10-15 17:48:26.563297+00	2021-10-15 18:03:16.031821+00	select\n  c.first_name || ' ' || c.last_name customer_name,\n  c.email customer_email,\n  f.title film_title\nfrom rental r\ninner join customer c\n  on r.customer_id = c.customer_id\ninner join inventory i\n  on r.inventory_id = i.inventory_id\ninner join film f\n  on i.film_id = f.film_id;	Rental titles by customer	1
2	2021-10-15 18:38:52.163382+00	2021-10-15 18:58:25.267832+00	with base as(\n  select\n    a.first_name,\n    a.last_name,\n    count(f.*) film_count\n  from actor a\n  inner join film_actor fa\n    on fa.actor_id = a.actor_id\n  inner join film f\n    on f.film_id = fa.film_id\n  group by a.actor_id\n)\n\nselect *\nfrom base\norder by film_count desc	Film actors	1
3	2021-10-15 19:05:10.531122+00	2021-10-15 19:05:10.531149+00	select * from nicer_but_slower_film_list	📽️ film list	2
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add echo user	1	add_echouser
2	Can change echo user	1	change_echouser
3	Can delete echo user	1	delete_echouser
4	Can view echo user	1	view_echouser
5	Can add saved queries	2	add_savedqueries
6	Can change saved queries	2	change_savedqueries
7	Can delete saved queries	2	delete_savedqueries
8	Can view saved queries	2	view_savedqueries
9	Can add log entry	3	add_logentry
10	Can change log entry	3	change_logentry
11	Can delete log entry	3	delete_logentry
12	Can view log entry	3	view_logentry
13	Can add permission	4	add_permission
14	Can change permission	4	change_permission
15	Can delete permission	4	delete_permission
16	Can view permission	4	view_permission
17	Can add group	5	add_group
18	Can change group	5	change_group
19	Can delete group	5	delete_group
20	Can view group	5	view_group
21	Can add content type	6	add_contenttype
22	Can change content type	6	change_contenttype
23	Can delete content type	6	delete_contenttype
24	Can view content type	6	view_contenttype
25	Can add session	7	add_session
26	Can change session	7	change_session
27	Can delete session	7	delete_session
28	Can view session	7	view_session
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	app	echouser
2	app	savedqueries
3	admin	logentry
4	auth	permission
5	auth	group
6	contenttypes	contenttype
7	sessions	session
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-10-15 17:41:51.047949+00
2	contenttypes	0002_remove_content_type_name	2021-10-15 17:41:51.065519+00
3	auth	0001_initial	2021-10-15 17:41:51.199986+00
4	auth	0002_alter_permission_name_max_length	2021-10-15 17:41:51.205111+00
5	auth	0003_alter_user_email_max_length	2021-10-15 17:41:51.210812+00
6	auth	0004_alter_user_username_opts	2021-10-15 17:41:51.216505+00
7	auth	0005_alter_user_last_login_null	2021-10-15 17:41:51.222716+00
8	auth	0006_require_contenttypes_0002	2021-10-15 17:41:51.225096+00
9	auth	0007_alter_validators_add_error_messages	2021-10-15 17:41:51.230859+00
10	auth	0008_alter_user_username_max_length	2021-10-15 17:41:51.236951+00
11	auth	0009_alter_user_last_name_max_length	2021-10-15 17:41:51.243843+00
12	auth	0010_alter_group_name_max_length	2021-10-15 17:41:51.257303+00
13	auth	0011_update_proxy_permissions	2021-10-15 17:41:51.262891+00
14	auth	0012_alter_user_first_name_max_length	2021-10-15 17:41:51.269047+00
15	app	0001_initial	2021-10-15 17:41:51.396498+00
16	admin	0001_initial	2021-10-15 17:41:51.453023+00
17	admin	0002_logentry_remove_auto_add	2021-10-15 17:41:51.460352+00
18	admin	0003_logentry_add_action_flag_choices	2021-10-15 17:41:51.468055+00
19	app	0002_echouser_role	2021-10-15 17:41:51.478131+00
20	app	0003_test_user_records	2021-10-15 17:41:51.496081+00
21	app	0004_savedqueries	2021-10-15 17:41:51.542255+00
22	sessions	0001_initial	2021-10-15 17:41:51.57678+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: echo_user
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
cb6xab95edbq8xv1k1waz6ypco8axjq0	.eJxVjMEOwiAQRP-FsyFCd1vw6N1vIAvsStXQpLQn47_bJj3ocea9mbcKtC4lrI3nMGZ1UVadfrtI6cl1B_lB9T7pNNVlHqPeFX3Qpm9T5tf1cP8OCrWyrXvjHRnnEAzQOULyrkMkHowZAKxlZNkSEHUUk0gW7wVJyMQeMzj1-QLM8Tg6:1mbSQH:qNMwlV1o1YNbEmxsBrdtdCY5xhyww4nX7ksRKVex72g	2021-10-29 18:59:17.715456+00
\.


--
-- Name: app_echouser_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.app_echouser_groups_id_seq', 1, false);


--
-- Name: app_echouser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.app_echouser_id_seq', 2, true);


--
-- Name: app_echouser_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.app_echouser_user_permissions_id_seq', 1, false);


--
-- Name: app_savedqueries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.app_savedqueries_id_seq', 3, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 28, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 7, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: echo_user
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 22, true);


--
-- Name: app_echouser app_echouser_email_key; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser
    ADD CONSTRAINT app_echouser_email_key UNIQUE (email);


--
-- Name: app_echouser_groups app_echouser_groups_echouser_id_group_id_79765b46_uniq; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_groups
    ADD CONSTRAINT app_echouser_groups_echouser_id_group_id_79765b46_uniq UNIQUE (echouser_id, group_id);


--
-- Name: app_echouser_groups app_echouser_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_groups
    ADD CONSTRAINT app_echouser_groups_pkey PRIMARY KEY (id);


--
-- Name: app_echouser app_echouser_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser
    ADD CONSTRAINT app_echouser_pkey PRIMARY KEY (id);


--
-- Name: app_echouser_user_permissions app_echouser_user_permis_echouser_id_permission_i_61961518_uniq; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_user_permissions
    ADD CONSTRAINT app_echouser_user_permis_echouser_id_permission_i_61961518_uniq UNIQUE (echouser_id, permission_id);


--
-- Name: app_echouser_user_permissions app_echouser_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_user_permissions
    ADD CONSTRAINT app_echouser_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: app_savedqueries app_savedqueries_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_savedqueries
    ADD CONSTRAINT app_savedqueries_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: app_echouser_email_a989aed0_like; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_echouser_email_a989aed0_like ON public.app_echouser USING btree (email varchar_pattern_ops);


--
-- Name: app_echouser_groups_echouser_id_5365ad9a; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_echouser_groups_echouser_id_5365ad9a ON public.app_echouser_groups USING btree (echouser_id);


--
-- Name: app_echouser_groups_group_id_bcb08aad; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_echouser_groups_group_id_bcb08aad ON public.app_echouser_groups USING btree (group_id);


--
-- Name: app_echouser_user_permissions_echouser_id_0bd7aed3; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_echouser_user_permissions_echouser_id_0bd7aed3 ON public.app_echouser_user_permissions USING btree (echouser_id);


--
-- Name: app_echouser_user_permissions_permission_id_0df3966c; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_echouser_user_permissions_permission_id_0df3966c ON public.app_echouser_user_permissions USING btree (permission_id);


--
-- Name: app_savedqueries_user_id_1809a180; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX app_savedqueries_user_id_1809a180 ON public.app_savedqueries USING btree (user_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: echo_user
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: app_echouser_groups app_echouser_groups_echouser_id_5365ad9a_fk_app_echouser_id; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_groups
    ADD CONSTRAINT app_echouser_groups_echouser_id_5365ad9a_fk_app_echouser_id FOREIGN KEY (echouser_id) REFERENCES public.app_echouser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_echouser_groups app_echouser_groups_group_id_bcb08aad_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_groups
    ADD CONSTRAINT app_echouser_groups_group_id_bcb08aad_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_echouser_user_permissions app_echouser_user_pe_echouser_id_0bd7aed3_fk_app_echou; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_user_permissions
    ADD CONSTRAINT app_echouser_user_pe_echouser_id_0bd7aed3_fk_app_echou FOREIGN KEY (echouser_id) REFERENCES public.app_echouser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_echouser_user_permissions app_echouser_user_pe_permission_id_0df3966c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_echouser_user_permissions
    ADD CONSTRAINT app_echouser_user_pe_permission_id_0df3966c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_savedqueries app_savedqueries_user_id_1809a180_fk_app_echouser_id; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.app_savedqueries
    ADD CONSTRAINT app_savedqueries_user_id_1809a180_fk_app_echouser_id FOREIGN KEY (user_id) REFERENCES public.app_echouser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_app_echouser_id; Type: FK CONSTRAINT; Schema: public; Owner: echo_user
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_app_echouser_id FOREIGN KEY (user_id) REFERENCES public.app_echouser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

