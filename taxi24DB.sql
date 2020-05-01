--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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
-- Name: driver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver (
    id bigint NOT NULL,
    "driverName" character varying,
    "driverSurname" character varying,
    "driverDoB" date,
    available boolean
);


ALTER TABLE public.driver OWNER TO postgres;

--
-- Name: driverlocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driverlocation (
    iddriver bigint NOT NULL,
    dlatitude double precision,
    dlongitude double precision
);


ALTER TABLE public.driverlocation OWNER TO postgres;

--
-- Name: rider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rider (
    "idRider" bigint NOT NULL,
    "riderName" character varying,
    "riderSurname" character varying
);


ALTER TABLE public.rider OWNER TO postgres;

--
-- Name: riderlocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riderlocation (
    "idRider" bigint NOT NULL,
    "rLatitude" double precision,
    "rLongitude" double precision
);


ALTER TABLE public.riderlocation OWNER TO postgres;

--
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    "idTrip" bigint NOT NULL,
    "idDriver" bigint NOT NULL,
    "idRider" bigint NOT NULL,
    completed boolean
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- Name: driverlocation driver-location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverlocation
    ADD CONSTRAINT "driver-location_pkey" PRIMARY KEY (iddriver);


--
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- Name: riderlocation rider-location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderlocation
    ADD CONSTRAINT "rider-location_pkey" PRIMARY KEY ("idRider");


--
-- Name: rider rider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rider
    ADD CONSTRAINT rider_pkey PRIMARY KEY ("idRider");


--
-- Name: trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_pkey PRIMARY KEY ("idTrip");


--
-- Name: fki_driverFK; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_driverFK" ON public.trip USING btree ("idDriver");


--
-- Name: fki_riderFK; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_riderFK" ON public.trip USING btree ("idRider");


--
-- Name: driverlocation FK-driver-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverlocation
    ADD CONSTRAINT "FK-driver-id" FOREIGN KEY (iddriver) REFERENCES public.driver(id) NOT VALID;


--
-- Name: riderlocation FK-rider-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderlocation
    ADD CONSTRAINT "FK-rider-id" FOREIGN KEY ("idRider") REFERENCES public.rider("idRider") NOT VALID;


--
-- Name: trip driverFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "driverFK" FOREIGN KEY ("idDriver") REFERENCES public.driver(id) NOT VALID;


--
-- Name: trip riderFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "riderFK" FOREIGN KEY ("idRider") REFERENCES public.rider("idRider") NOT VALID;


--
-- PostgreSQL database dump complete
--

