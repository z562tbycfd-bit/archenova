"use client";

import {
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import * as THREE
  from "three";


type CitizenProps = {
  lane:
    number;

  phase:
    number;

  direction:
    1 |
    -1;
};


function Citizen({
  lane,
  phase,
  direction,
}: CitizenProps) {
  const ref =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      if (
        !ref.current
      ) {
        return;
      }


      const range =
        54;


      const movement =
        (
          state.clock
            .elapsedTime *
            1.15 *
            direction +
          phase
        ) %
        (
          range *
          2
        );


      let z =
        movement -
        range;


      if (
        z <
        -range
      ) {
        z +=
          range *
          2;
      }


      ref.current.position.z =
        z +
        18;
    },
  );


  return (
    <group
      ref={
        ref
      }
      position={[
        lane,
        0,
        0,
      ]}
    >
      {/* body */}

      <mesh
        position={[
          0,
          1.05,
          0,
        ]}
      >
        <capsuleGeometry
          args={[
            0.18,
            0.9,
            4,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#727b80"
          roughness={
            0.78
          }
        />
      </mesh>


      {/* head */}

      <mesh
        position={[
          0,
          1.78,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.16,
            10,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#b9ada0"
          roughness={
            0.9
          }
        />
      </mesh>
    </group>
  );
}


function ResearchDrone({
  phase,
}: {
  phase:
    number;
}) {
  const ref =
    useRef<THREE.Group>(
      null,
    );


  useFrame(
    (
      state,
    ) => {
      if (
        !ref.current
      ) {
        return;
      }


      const t =
        state.clock
          .elapsedTime *
          0.18 +
        phase;


      ref.current.position.set(
        Math.cos(
          t,
        ) *
          23,

        9 +
          Math.sin(
            t *
              2.1,
          ) *
            0.7,

        -6 +
          Math.sin(
            t,
          ) *
            19,
      );


      ref.current.rotation.y =
        -t +
        Math.PI /
          2;
    },
  );


  return (
    <group
      ref={
        ref
      }
    >
      <mesh>
        <sphereGeometry
          args={[
            0.35,
            12,
            10,
          ]}
        />

        <meshStandardMaterial
          color="#667780"
          metalness={
            0.68
          }
          roughness={
            0.24
          }
        />
      </mesh>


      <mesh
        rotation={[
          Math.PI /
            2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.6,
            0.025,
            8,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#9edfff"
        />
      </mesh>


      <pointLight
        intensity={
          0.8
        }
        distance={
          4
        }
        color="#9edfff"
      />
    </group>
  );
}


export default function CivicLife() {
  return (
    <group>
      <Citizen
        lane={
          -10
        }
        phase={
          3
        }
        direction={
          1
        }
      />

      <Citizen
        lane={
          -11.5
        }
        phase={
          17
        }
        direction={
          -1
        }
      />

      <Citizen
        lane={
          10
        }
        phase={
          28
        }
        direction={
          -1
        }
      />

      <Citizen
        lane={
          11.5
        }
        phase={
          41
        }
        direction={
          1
        }
      />

      <Citizen
        lane={
          -18
        }
        phase={
          52
        }
        direction={
          1
        }
      />

      <Citizen
        lane={
          18
        }
        phase={
          64
        }
        direction={
          -1
        }
      />


      <ResearchDrone
        phase={
          0
        }
      />

      <ResearchDrone
        phase={
          Math.PI
        }
      />
    </group>
  );
}