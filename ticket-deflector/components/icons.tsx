type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      viewBox="0 0 50 50"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#000" fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
        <path
          d="M31.624 15a1.56 1.56 0 0 1 1.502 1.133l1.694 5.93a7.81 7.81 0 0 0 5.366 5.366l5.93 1.694a1.563 1.563 0 0 1 0 3.004l-5.93 1.694a7.81 7.81 0 0 0-5.366 5.367l-1.694 5.929a1.563 1.563 0 0 1-3.004 0l-1.694-5.93a7.81 7.81 0 0 0-5.367-5.366l-5.929-1.694a1.563 1.563 0 0 1 0-3.004l5.93-1.694a7.81 7.81 0 0 0 5.366-5.366l1.694-5.93A1.56 1.56 0 0 1 31.624 15M15.379 5a1.56 1.56 0 0 1 1.516 1.183l.538 2.159a5.48 5.48 0 0 0 3.979 3.979l2.158.537a1.563 1.563 0 0 1 0 3.034l-2.158.537a5.48 5.48 0 0 0-3.98 3.98l-.537 2.158a1.563 1.563 0 0 1-3.033 0l-.538-2.159a5.47 5.47 0 0 0-3.979-3.979l-2.158-.537a1.563 1.563 0 0 1 0-3.034l2.158-.537a5.47 5.47 0 0 0 3.98-3.98l.537-2.158A1.56 1.56 0 0 1 15.379 5"
          style={{
            fill: '#000',
            fillOpacity: 1,
          }}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            d="M0 0h50v50H0z"
            style={{
              fill: '#fff',
              fillOpacity: 1,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 4.75V6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M17.1266 6.87347L16.0659 7.93413"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19.25 12L17.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M17.1266 17.1265L16.0659 16.0659"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 17.75V19.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.9342 16.0659L6.87354 17.1265"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6.25 12L4.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.9342 7.93413L6.87354 6.87347"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  copy: (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 12.25H14.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 15.25H14.25"
      ></path>
    </svg>
  ),
  check: (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
      ></path>
    </svg>
  ),
  download: (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 14.25L12 4.75"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.75 10.75L12 14.25L15.25 10.75"
      ></path>
    </svg>
  ),
  user: (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      ></circle>
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"
      ></path>
    </svg>
  ),
  github: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  loader: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  checkCircle: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  crossCircle: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  ),
  circleDashed: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0" />
      <path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" />
      <path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8" />
      <path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" />
      <path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0" />
      <path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" />
      <path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8" />
      <path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" />
    </svg>
  ),
};
