import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  runApp(const AmbulanceApp());
}

class AmbulanceApp extends StatelessWidget {
  const AmbulanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MapScreen(),
    );
  }
}

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  Set<Polyline> polylines = {};
  GoogleMapController? mapController;
  LatLng currentPosition = const LatLng(0, 0);
  LatLng destination = LatLng(17.4065, 78.4772); // example hospital
  Future<void> getRoute() async {
    final String apiKey = dotenv.env['GOOGLE_MAPS_API_KEY']!;

    final url =
        "https://maps.googleapis.com/maps/api/directions/json?"
        "origin=${currentPosition.latitude},${currentPosition.longitude}"
        "&destination=${destination.latitude},${destination.longitude}"
        "&key=$apiKey";

    final response = await http.get(Uri.parse(url));

    final data = jsonDecode(response.body);

    if (data["routes"].isEmpty) return;
    final points = data["routes"][0]["overview_polyline"]["points"];

    PolylinePoints polylinePoints = PolylinePoints();

    List<PointLatLng> decodedPoints = polylinePoints.decodePolyline(points);

    List<LatLng> routePoints = decodedPoints
        .map((point) => LatLng(point.latitude, point.longitude))
        .toList();

    setState(() {
      polylines.clear();
      polylines.add(
        Polyline(
          polylineId: const PolylineId("route"),
          points: routePoints,
          width: 5,
          color: Colors.blue,
        ),
      );
    });
  }
  Future<void> getLocation() async {

    LocationPermission permission = await Geolocator.requestPermission();

    Position position = await Geolocator.getCurrentPosition();

    setState(() {
      currentPosition = LatLng(position.latitude, position.longitude);
    });

    mapController?.animateCamera(
      CameraUpdate.newLatLngZoom(currentPosition, 16),
    );
    await getRoute();
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    getLocation();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Ambulance Tracker")),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: const CameraPosition(
          target: LatLng(17.385044, 78.486671),
          zoom: 12,
        ),
        markers: {
          Marker(
            markerId: const MarkerId("ambulance"),
            position: currentPosition,
          ),
          Marker(
            markerId: const MarkerId("hospital"),
            position: destination,
          ),
        },
        polylines: polylines,
      ),
    );
  }
}